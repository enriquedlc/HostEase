package com.hostease.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "like_table")
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long likeId;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_event_id", nullable = false)
    private Event event;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_user_id", nullable = false)
    private User user;

    @Column(name = "liked", nullable = false, columnDefinition = "BOOLEAN default false")
    private Boolean liked;

    @Column(name = "liked_at", nullable = false, columnDefinition = "DATETIME default CURRENT_TIMESTAMP")
    private String likedAt;

    public Like() {
    }

    public Like(Long likeId, Event event, User user, Boolean liked, String likedAt) {
        this.likeId = likeId;
        this.event = event;
        this.user = user;
        this.liked = liked;
        this.likedAt = likedAt;
    }

    public Like(Event event, User user, Boolean liked, String likedAt) {
        this.event = event;
        this.user = user;
        this.liked = liked;
        this.likedAt = likedAt;
    }

    public Long getLikeId() {
        return likeId;
    }

    public void setLikeId(Long likeId) {
        this.likeId = likeId;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Boolean getLiked() {
        return liked;
    }

    public void setLiked(Boolean liked) {
        this.liked = liked;
    }

    public String getLikedAt() {
        return likedAt;
    }

    public void setLikedAt(String likedAt) {
        this.likedAt = likedAt;
    }

    @Override
    public String toString() {
        return "Like [event=" + event + ", liked=" + liked + ", likedAt=" + likedAt + ", likeId=" + likeId + ", user="
                + user + "]";
    }

}
