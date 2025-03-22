package com.example.asset_management.report;

import java.io.File;
import java.io.FileOutputStream;
import java.time.Year;
import java.util.List;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.example.asset_management.entity.asset.Asset;
import com.example.asset_management.repository.AssetRepository;
import com.example.asset_management.service.AssetService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;
    private final AssetService assetService;
    private final AssetRepository assetRepository;

    public File generateExcelReport(List<Asset> tables) throws Exception {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Depreciation Report");

        int rowIndex = 0;

        for (Asset table : tables) {
            int startRow = rowIndex;

            String[] headers = {
                "ID",
                "Building",
                "Room",
                "Series",
                "isBroken",
                "Brand",
                "Model",
                "Type",
                "material",
                "Product Year",
                "Date In System",
                "Expire Date",
                "Estimated Life",
                "Original Value",
                "Depreciation Value",
                "Residual Value"
            };

            for (String header : headers) {
                Row row = sheet.createRow(rowIndex);
                row.createCell(0).setCellValue(header);

                switch (header) {
                    case "ID" -> row.createCell(1).setCellValue(table.getId());
                    case "Building" -> row.createCell(1)
                            .setCellValue(table.getBuilding().getName());
                    case "Room" -> row.createCell(1)
                            .setCellValue(table.getRoom().getRoomNumber());

                    case "Series" -> row.createCell(1).setCellValue(table.getSeries());
                    case "isBroken" -> row.createCell(1).setCellValue(table.getIsBroken());
                    case "Brand" -> row.createCell(1).setCellValue(table.getBrand());
                    case "Model" -> row.createCell(1).setCellValue(table.getModel());
                    case "Type" -> row.createCell(1).setCellValue(table.getType());
                    case "material" -> row.createCell(1).setCellValue(table.getMaterial());
                    case "Product Year" -> row.createCell(1).setCellValue(table.getProductYear());

                    case "Date In System" -> row.createCell(1)
                            .setCellValue(table.getDateInSystem().toString());
                    case "Estimated Life" -> row.createCell(1).setCellValue(table.getEstimatedLife() + " years");
                    case "Expire Date" -> row.createCell(1)
                            .setCellValue(table.getExpireDate().toString());

                    case "Original Value" -> row.createCell(1).setCellValue(table.getOriginalValue());
                    case "Depreciation Value" -> row.createCell(1).setCellValue(table.getDepreciationValue());
                    case "Residual Value" -> row.createCell(1).setCellValue(table.getResidualValue());
                }
                rowIndex++;
            }

            Row headerRow = sheet.createRow(startRow) != null ? sheet.getRow(startRow) : sheet.createRow(startRow);
            headerRow.createCell(3).setCellValue("Year");
            headerRow.createCell(4).setCellValue("Residual Value");

            int startYear = table.getDateInSystem().getYear();
            double originalValue = table.getOriginalValue();
            double depreciationPerYear = 500000;
            double remainingValue = originalValue;

            int year = startYear;
            int depreciationRowIndex = startRow + 1;

            while (remainingValue >= 0) {
                Row row = sheet.getRow(depreciationRowIndex) != null
                        ? sheet.getRow(depreciationRowIndex)
                        : sheet.createRow(depreciationRowIndex);
                row.createCell(3).setCellValue(year);
                row.createCell(4).setCellValue(remainingValue);

                remainingValue -= depreciationPerYear;
                if (remainingValue <= 0) break;
                year++;
                depreciationRowIndex++;
            }

            rowIndex = depreciationRowIndex + 2;
        }

        File tempFile = File.createTempFile("annual_report", ".xlsx");
        try (FileOutputStream fileOut = new FileOutputStream(tempFile)) {
            workbook.write(fileOut);
        }
        workbook.close();

        return tempFile;
    }

    public void sendReport(String recipient, String subject, String body, File attachment) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(recipient);
        helper.setSubject(subject);
        helper.setText(body);
        helper.setFrom("tuanphonglqd@gmail.com");
        helper.addAttachment(attachment.getName(), attachment);

        mailSender.send(message);
    }

    @Scheduled(cron = "0 0 0 1 1 *")
    public void sendAnnualReport() {
        try {
            List<Asset> tables = assetRepository.findAll();
            File reportFile = generateExcelReport(tables);
            int currentYear = Year.now().getValue();

            sendReport(
                    "tuanphonglqd@gmail.com",
                    "Báo cáo khấu hao tài sản hàng năm",
                    "Báo cáo khấu hao tài sản năm" + currentYear,
                    reportFile);
            reportFile.delete();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
