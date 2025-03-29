package com.example.asset_management.report;

import com.example.asset_management.entity.asset.Asset;
import com.example.asset_management.repository.AssetRepository;
import com.example.asset_management.service.AssetService;
import jakarta.activation.DataSource;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.util.ByteArrayDataSource;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Slf4j
@Service
public class CheckService {

    private final AssetRepository assetRepository;
    private final JavaMailSender mailSender;
    private final AssetService assetService;

    private static final Double DEPRECIATION_THRESHOLD = 0.3;
    private static final String HOST_EMAIL = "tuanphonglqd@gmail.com";

    public List<Asset> getLowValueAssets() {
        return assetRepository.findAll()
                .stream()
                .filter(asset -> (asset.getResidualValue() <= asset.getOriginalValue() * DEPRECIATION_THRESHOLD) && (asset.getResidualValue() >= 1))
                .collect(Collectors.toList());
    }


    private byte[] generateExcelReport(List<Asset> assets, String sheetName) {
        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet(sheetName);

            Row headerRow = sheet.createRow(0);
            String[] headers = {
                    "AssetType", "Building", "Room", "",
                    "Series", "isBroken", "Brand", "Model", "Type", "material", "Product Year", "",
                    "Date In System", "Expire Date", "Estimated Life", "",
                    "Original Value", "Depreciation Rate", "Residual Value"
            };
            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
                cell.setCellStyle(createHeaderStyle(workbook));
            }

            int rowNum = 1;
            for (Asset asset : assets) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(asset.getAssetType().toString());
                row.createCell(1).setCellValue(asset.getBuilding().getName());
                row.createCell(2).setCellValue(asset.getRoom().getRoomNumber());

                row.createCell(3);

                row.createCell(4).setCellValue(asset.getSeries());
                row.createCell(5).setCellValue(asset.getIsBroken());
                row.createCell(6).setCellValue(asset.getBrand());
                row.createCell(7).setCellValue(asset.getModel());
                row.createCell(8).setCellValue(asset.getType());
                row.createCell(9).setCellValue(asset.getMaterial());
                row.createCell(10).setCellValue(asset.getProductYear());

                row.createCell(11);

                row.createCell(12).setCellValue(asset.getDateInSystem().toString());
                row.createCell(13).setCellValue(asset.getEstimatedLife() + " years");
                row.createCell(14).setCellValue(asset.getExpireDate().toString());

                row.createCell(15);

                row.createCell(16).setCellValue(asset.getOriginalValue().intValue() + " USD");
                row.createCell(17).setCellValue(asset.getDepreciationRate());
                row.createCell(18).setCellValue(asset.getResidualValue().intValue()+ " USD");
            }

            workbook.write(outputStream);
            return outputStream.toByteArray();
        } catch (Exception e) {
            log.error("Lỗi khi tạo file Excel: ", e);
            return new byte[0];
        }
    }

    private CellStyle createHeaderStyle(Workbook workbook) {
        CellStyle style = workbook.createCellStyle();
        Font font = workbook.createFont();
        font.setBold(true);
        style.setFont(font);
        return style;
    }

    private void sendEmailWithAttachment(String to, String subject, String text, byte[] attachment, String fileName) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text);

            DataSource dataSource = new ByteArrayDataSource(attachment, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            helper.addAttachment(fileName, dataSource);

            mailSender.send(message);
            log.info("Đã gửi email với file đính kèm đến {}", to);
        } catch (Exception e) {
            log.error("Lỗi khi gửi email: ", e);
        }
    }

    public void checkAssets(String email) {
        assetService.updateResidualValues();

        List<Asset> expiredAssets = assetRepository.findByExpireDateBefore(LocalDate.now());
        List<Asset> deterioratingAssets = getLowValueAssets();

        if (deterioratingAssets.isEmpty()) {
            return;
        }
        if (expiredAssets.isEmpty()) {
            return;
        }

        List<Asset> sellableAssets = expiredAssets.stream()
                .filter(asset -> asset.getResidualValue() > 0)
                .toList();

        List<Asset> discardAssets = expiredAssets.stream()
                .filter(asset -> asset.getResidualValue() <= 10)
                .toList();

        byte[] deterFile = generateExcelReport(deterioratingAssets, "Danh sách tài sản xuống cấp");
        sendEmailWithAttachment(email, "Cảnh báo tài sản xuống cấp",
                    "Đính kèm danh sách tài sản có giá trị còn lại dưới 30%.", deterFile, "deteriorating_Assets.xlsx");


        if (!sellableAssets.isEmpty()) {
            byte[] sellExcel = generateExcelReport(sellableAssets, "Danh sách tài sản thanh lý");
            sendEmailWithAttachment(email, "Danh sách tài sản thanh lý",
                    "Đính kèm danh sách tài sản có thể thanh lý.", sellExcel, "Sellable_Assets.xlsx");
        }

        if (!discardAssets.isEmpty()) {
            byte[] discardExcel = generateExcelReport(discardAssets, "Danh sách tài sản vứt bỏ");
            sendEmailWithAttachment(email, "Danh sách tài sản vứt bỏ",
                    "Đính kèm danh sách tài sản cần vứt bỏ.", discardExcel, "Discard_Assets.xlsx");
        }
    }

    @Scheduled(cron = "0 0 0 1 1 *")
    public void checkAssets() {
        assetService.updateResidualValues();

        List<Asset> expiredAssets = assetRepository.findByExpireDateBefore(LocalDate.now());
        List<Asset> deterioratingAssets = getLowValueAssets();

        if (deterioratingAssets.isEmpty()) {
            return;
        }
        if (expiredAssets.isEmpty()) {
            return;
        }

        List<Asset> sellableAssets = expiredAssets.stream()
                .filter(asset -> asset.getResidualValue() > 0)
                .toList();

        List<Asset> discardAssets = expiredAssets.stream()
                .filter(asset -> asset.getResidualValue() <= 10)
                .toList();

        byte[] deterFile = generateExcelReport(deterioratingAssets, "Danh sách tài sản xuống cấp");
        sendEmailWithAttachment(HOST_EMAIL, "Cảnh báo tài sản xuống cấp",
                "Đính kèm danh sách tài sản có giá trị còn lại dưới 30%.", deterFile, "deteriorating_Assets.xlsx");


        if (!sellableAssets.isEmpty()) {
            byte[] sellExcel = generateExcelReport(sellableAssets, "Danh sách tài sản thanh lý");
            sendEmailWithAttachment(HOST_EMAIL, "Danh sách tài sản thanh lý",
                    "Đính kèm danh sách tài sản có thể thanh lý.", sellExcel, "Sellable_Assets.xlsx");
        }

        if (!discardAssets.isEmpty()) {
            byte[] discardExcel = generateExcelReport(discardAssets, "Danh sách tài sản vứt bỏ");
            sendEmailWithAttachment(HOST_EMAIL, "Danh sách tài sản vứt bỏ",
                    "Đính kèm danh sách tài sản cần vứt bỏ.", discardExcel, "Discard_Assets.xlsx");
        }
    }
}
