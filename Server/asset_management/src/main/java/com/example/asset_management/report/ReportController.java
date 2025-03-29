package com.example.asset_management.report;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.asset_management.entity.asset.AssetType;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/report")
public class ReportController {

    private final ReportService reportService;
    private final EmailService emailService;
    private final CheckService checkService;

    @GetMapping("/export-excel")
    public ResponseEntity<?> exportExcel(
            @RequestParam Long buildingId, @RequestParam Long roomId, @RequestParam AssetType assetType) {
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
    public ResponseEntity<byte[]> downloadReport(
            @RequestParam Long buildingId, @RequestParam Long roomId, @RequestParam AssetType assetType) {
        try {

            File reportFile = emailService.generateExcelReport(buildingId, roomId, assetType);

            byte[] fileBytes = Files.readAllBytes(reportFile.toPath());

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=annual_report.xlsx")
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(fileBytes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/send")
    public ResponseEntity<String> sendReport(
            @RequestParam Long buildingId,
            @RequestParam Long roomId,
            @RequestParam AssetType assetType,
            @RequestParam String email) {
        try {
            File reportFile = emailService.generateExcelReport(buildingId, roomId, assetType);

            int currentYear = Year.now().getValue();

            String subject = "Báo cáo khấu hao tài sản hàng năm";
            String body = "Báo cáo khấu hao tài sản năm" + currentYear;

            emailService.sendReport(email, subject, body, reportFile);
            return ResponseEntity.ok("Send successfully: " + email);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error when send to: " + e.getMessage());
        }
    }

    @GetMapping("/check")
    public ResponseEntity<String> checkDepreciation() {
        checkService.checkAssets();
        return ResponseEntity.ok("Depreciation check completed, notifications sent if needed.");
    }
}
