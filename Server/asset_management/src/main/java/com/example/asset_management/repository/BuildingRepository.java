package com.example.asset_management.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.asset_management.entity.building.Building;

@Repository
public interface BuildingRepository extends JpaRepository<Building, Long> {
    List<Building> findAll();
}
