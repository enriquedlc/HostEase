package com.hostease.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

@Entity
@Table(name = "user_event_like_table")
@IdClass(UserEventLikeId.class)
public class UserEventLike implements Serializable {

    @Id
    @Column
    private Long userId;

    @Id
    @Column
    private Long eventId;

    @Column(name = "liked_at", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private String likedAt;

    public UserEventLike() {
    }

    public UserEventLike(Long userId, Long eventId, String likedAt) {
        this.userId = userId;
        this.eventId = eventId;
        this.likedAt = likedAt;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getEventId() {
        return eventId;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }

    public String getLikedAt() {
        return likedAt;
    }

    public void setLikedAt(String likedAt) {
        this.likedAt = likedAt;
    }

}
