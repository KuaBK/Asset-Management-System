package com.example.asset_management.report;

import com.example.asset_management.entity.asset.Asset;
import com.example.asset_management.entity.asset.AssetType;
import com.example.asset_management.repository.AssetRepository;
import com.example.asset_management.service.AssetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.nio.file.Files;
import java.time.Year;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/report")
public class ReportController {

    private final AssetRepository assetRepository;
    private final ReportService reportService;
    private final AssetService assetService;
    private final EmailService emailService;

    @GetMapping("/export-excel")
    public ResponseEntity<?> exportExcel(
            @RequestParam Long buildingId,
            @RequestParam Long roomId,
            @RequestParam AssetType assetType) {
        try {
            String fileUrl = reportService.generateAndUploadExcel(buildingId, roomId, assetType);
            return ResponseEntity.ok(fileUrl);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid building ID, room ID, or asset type.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error generating report");
        }
    }


    @GetMapping("/download")
    public ResponseEntity<byte[]> downloadReport() {
        try {
            List<Asset> tables = assetRepository.findAll();

            File reportFile = emailService.generateExcelReport(tables);
            byte[] fileBytes = Files.readAllBytes(reportFile.toPath());

            reportFile.delete();

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=annual_report.xlsx")
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(fileBytes);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/send")
    public ResponseEntity<String> sendReport(@RequestParam String email) {
        try {
            List<Asset> tables = assetRepository.findAll();
            File reportFile = emailService.generateExcelReport(tables);

            int currentYear = Year.now().getValue();

            String subject = "Báo cáo khấu hao tài sản hàng năm";
            String body = "Báo cáo khấu hao tài sản năm" + currentYear;

            emailService.sendReport(email, subject, body, reportFile);
            return ResponseEntity.ok("Báo cáo đã được gửi về email: " + email);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Lỗi khi gửi email: " + e.getMessage());
        }
    }
}
