package com.hostease.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

@Entity
@Table(name = "user_achievement_table")
@IdClass(UserAchievementId.class)
public class UserAchievement implements Serializable {

    @Id
    @Column(name = "user_id")
    private Long userId;

    @Id
    @Column(name = "achievement_id")
    private Long achievementId;

    @Column(name = "obteined_at", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private String obteinedAt;

    public UserAchievement() {
    }

    public UserAchievement(Long userId, Long achievementId, String obteinedAt) {
        this.userId = userId;
        this.achievementId = achievementId;
        this.obteinedAt = obteinedAt;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getAchievementId() {
        return achievementId;
    }

    public void setAchievementId(Long achievementId) {
        this.achievementId = achievementId;
    }

    public String getObteinedAt() {
        return obteinedAt;
    }

    public void setObteinedAt(String obteinedAt) {
        this.obteinedAt = obteinedAt;
    }

}
