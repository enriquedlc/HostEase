package com.hostease.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "user_achievement_table")
public class UserAchievement {

    // TODO: Caused by: java.sql.SQLException:
    // Field 'id' doesn't have a default value
    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, columnDefinition = "BIGINT default 0")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "achievement_id")
    private Achievement achievement;

    @Column(name = "obtained_at", nullable = false, columnDefinition = "DATETIME default CURRENT_TIMESTAMP")
    private Date obtainedAt;

    public UserAchievement() {
    }

    public UserAchievement(Long id, User user, Achievement achievement, Date obtainedAt) {
        this.id = id;
        this.user = user;
        this.achievement = achievement;
        this.obtainedAt = obtainedAt;
    }

    public UserAchievement(User user, Achievement achievement, Date obtainedAt) {
        this.user = user;
        this.achievement = achievement;
        this.obtainedAt = obtainedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Achievement getAchievement() {
        return achievement;
    }

    public void setAchievement(Achievement achievement) {
        this.achievement = achievement;
    }

    public Date getObtainedAt() {
        return obtainedAt;
    }

    public void setObtainedAt(Date obtainedAt) {
        this.obtainedAt = obtainedAt;
    }

}
