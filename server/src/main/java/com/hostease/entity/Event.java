package com.hostease.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "event_table")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false, length = 45)
    private String title;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "startDate", nullable = false)
    private String startDate;

    @Column(name = "endDate", nullable = true)
    private String endDate;

    @Column(name = "startTime", nullable = false)
    private String startTime;

    @Column(name = "endTime", nullable = false)
    private String endTime;

    @Column(name = "locationLat", nullable = false)
    private Double locationLat;

    @Column(name = "locationLng", nullable = false)
    private Double locationLng;

    @Column(name = "maxCapacity", nullable = false)
    private Long maxCapacity;

    @Column(name = "photo", nullable = false)
    private Double photo;

}
