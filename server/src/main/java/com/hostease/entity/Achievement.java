package com.hostease.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "achievement_table")
public class Achievement {

    @JsonIgnore
    @ManyToMany(mappedBy = "achievements")
    private Set<User> users = new HashSet<>();

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "achievement", nullable = false, length = 45)
    private String achievement;

    @Column(name = "xpPoints", nullable = false)
    private Long xpPoints;

    @Column(name = "photo", nullable = false)
    private Double photo;

    public Achievement() {
    }

    public Achievement(Long id, String achievement, Long xpPoints, Double photo) {
        this.id = id;
        this.achievement = achievement;
        this.xpPoints = xpPoints;
        this.photo = photo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAchievement() {
        return achievement;
    }

    public void setAchievement(String achievement) {
        this.achievement = achievement;
    }

    public Long getXpPoints() {
        return xpPoints;
    }

    public void setXpPoints(Long xpPoints) {
        this.xpPoints = xpPoints;
    }

    public Double getPhoto() {
        return photo;
    }

    public void setPhoto(Double photo) {
        this.photo = photo;
    }

    @Override
    public String toString() {
        return "Achievement [id=" + id + ", achievement=" + achievement + ", xpPoints=" + xpPoints + ", photo=" + photo
                + "]";
    }

}
