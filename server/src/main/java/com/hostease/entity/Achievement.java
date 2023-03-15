package com.hostease.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "achievement_table")
public class Achievement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "achievement", nullable = false, length = 45)
    private String achievement;

    @Column(name = "xpPoints", nullable = false)
    private Long xpPoints;

    @Column(name = "photo", nullable = false)
    private Double photo;

}
