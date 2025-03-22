package com.example.asset_management.report;

import java.io.File;
import java.io.FileOutputStream;
import java.util.List;
import java.util.Map;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.asset_management.entity.asset.Asset;
import com.example.asset_management.entity.asset.AssetType;
import com.example.asset_management.repository.AssetRepository;
import com.example.asset_management.repository.BuildingRepository;
import com.example.asset_management.repository.RoomRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final Cloudinary cloudinary;
    private final BuildingRepository buildingRepository;
    private final RoomRepository roomRepository;
    private final AssetRepository assetRepository;

    public String generateAndUploadExcel(Long buildingId, Long roomId, AssetType assetType) throws Exception {

        if (buildingId != 0 && !buildingRepository.existsById(buildingId)) {
            throw new IllegalArgumentException("Invalid building ID: " + buildingId);
        }
        if (roomId != 0 && !roomRepository.existsById(roomId)) {
            throw new IllegalArgumentException("Invalid room ID: " + roomId);
        }

        if (assetType == null) {
            throw new IllegalArgumentException("Asset Type không hợp lệ!");
        }

        List<Asset> assets;

        if (buildingId == 0 && roomId == 0 && assetType == AssetType.ALL) { // tất cả tòa, tất cả phòng, tất cả đồ vật
            assets = assetRepository.findAll();
        } else if (buildingId == 0 && roomId == 0) { // tất cả tòa, tất cả phòng, đồ vật cụ thể
            assets = assetRepository.findByAssetType(assetType);
        } else if (roomId == 0 && assetType == AssetType.ALL) { // tòa cụ thể, tất cả phòng, tất cả đồ vật
            assets = assetRepository.findByBuildingId(buildingId);
        } else if (roomId == 0) { // tòa cụ thể, tất cả phòng, đồ vật cụ thể
            assets = assetRepository.findByBuildingIdAndAssetType(buildingId, assetType);
        } else if (assetType == AssetType.ALL) { // tòa cụ thể, phòng cụ thể , tất cả đồ vật
            assets = assetRepository.findByBuildingIdAndRoomId(buildingId, roomId);
        } else { // tòa cụ thể, phòng cụ thể , đồ vật cụ thể
            assets = assetRepository.findByBuildingIdAndRoomIdAndAssetType(buildingId, roomId, assetType);
        }

        if (assets.isEmpty()) {
            throw new IllegalArgumentException("No assets found for the given filters.");
        }

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Depreciation Report");

        int rowIndex = 0;

        for (Asset asset : assets) {
            int startRow = rowIndex;

            String[] headers = {
                "AssetType",
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
                    case "AssetType" -> row.createCell(1)
                            .setCellValue(asset.getAssetType().toString());
                    case "Building" -> row.createCell(1)
                            .setCellValue(asset.getBuilding().getName());
                    case "Room" -> row.createCell(1)
                            .setCellValue(asset.getRoom().getRoomNumber());

                    case "Series" -> row.createCell(1).setCellValue(asset.getSeries());
                    case "isBroken" -> row.createCell(1).setCellValue(asset.getIsBroken());
                    case "Brand" -> row.createCell(1).setCellValue(asset.getBrand());
                    case "Model" -> row.createCell(1).setCellValue(asset.getModel());
                    case "Type" -> row.createCell(1).setCellValue(asset.getType());
                    case "material" -> row.createCell(1).setCellValue(asset.getMaterial());
                    case "Product Year" -> row.createCell(1).setCellValue(asset.getProductYear());

                    case "Date In System" -> row.createCell(1)
                            .setCellValue(asset.getDateInSystem().toString());
                    case "Estimated Life" -> row.createCell(1).setCellValue(asset.getEstimatedLife() + " years");
                    case "Expire Date" -> row.createCell(1)
                            .setCellValue(asset.getExpireDate().toString());

                    case "Original Value" -> row.createCell(1).setCellValue(asset.getOriginalValue());
                    case "Depreciation Value" -> row.createCell(1).setCellValue(asset.getDepreciationValue());
                    case "Residual Value" -> row.createCell(1).setCellValue(asset.getResidualValue());
                }
                rowIndex++;
            }

            Row headerRow = sheet.getRow(startRow) != null ? sheet.getRow(startRow) : sheet.createRow(startRow);
            headerRow.createCell(3).setCellValue("Year");
            headerRow.createCell(4).setCellValue("Residual Value");

            int startYear = asset.getDateInSystem().getYear();
            double originalValue = asset.getOriginalValue();
            double depreciationPerYear = asset.getDepreciationValue();
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
                if (remainingValue < 0) break;
                year++;
                depreciationRowIndex++;
            }

            rowIndex = Math.max(rowIndex, depreciationRowIndex) + 2;
        }

        File tempFile = File.createTempFile("depreciation_report", ".xlsx");
        try (FileOutputStream fileOut = new FileOutputStream(tempFile)) {
            workbook.write(fileOut);
        }
        workbook.close();

        Map uploadResult = cloudinary.uploader().upload(tempFile, ObjectUtils.asMap("resource_type", "raw"));

        return uploadResult.get("url").toString();
    }
}
