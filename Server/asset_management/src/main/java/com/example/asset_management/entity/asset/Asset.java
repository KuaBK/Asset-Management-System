package com.example.asset_management.entity.asset;

import java.time.LocalDate;

import jakarta.persistence.*;

import com.example.asset_management.entity.building.Building;
import com.example.asset_management.entity.room.Room;

import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Asset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AssetType assetType;

    @ManyToOne
    @JoinColumn(name = "building_id", nullable = false)
    private Building building;

    @ManyToOne
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    @Column(nullable = false, unique = true)
    private String series;

    @Column(nullable = false)
    private Boolean isBroken;

    @Column(nullable = false)
    private String brand;

    @Column(nullable = false)
    private String model;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private String material;

    @Column(nullable = false)
    private Integer productYear;

    @Column(nullable = false)
    private LocalDate dateInSystem;

    @Column(nullable = false)
    private LocalDate expireDate;

    @Column(nullable = false)
    private Integer estimatedLife;

    @Column(nullable = false)
    private Double originalValue;

    @Column(nullable = false)
    private Double residualValue;

    @Column(nullable = false)
    private Double depreciationRate;
}
