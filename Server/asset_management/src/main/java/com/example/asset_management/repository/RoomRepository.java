package com.example.asset_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.asset_management.entity.room.Room;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {}
