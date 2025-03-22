package com.example.asset_management.entity.room;

import com.example.asset_management.entity.building.Building;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Table(name = "rooms")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String roomNumber;

    @ManyToOne
    @JoinColumn(name = "building_id", nullable = false)
    @JsonBackReference
    private Building building;
}
