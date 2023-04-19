package com.hostease.entity;

import java.io.Serializable;

public class UserEventLikeId implements Serializable {

    private Long userId;

    private Long eventId;

    public UserEventLikeId() {
    }

    public UserEventLikeId(Long userId, Long eventId) {
        this.userId = userId;
        this.eventId = eventId;
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
    
}
