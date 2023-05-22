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

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.hostease.deserializer.CustomMessageDeserializer;
import com.hostease.serializer.CustomUserSerializer;

@Entity
@Table(name = "message_table")
@JsonDeserialize(using = CustomMessageDeserializer.class)
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "message", nullable = false)
    private String message;

    @Column(name = "published_at", nullable = false, columnDefinition = "DATETIME default CURRENT_TIMESTAMP")
    private String publishedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_event_id", nullable = false)
    @JsonBackReference
    private Event event;

    @JsonSerialize(using = CustomUserSerializer.class)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_user_id", nullable = false)
    private User user;

    public Message() {
    }

    public Message(Long id, String message, String publishedAt, Event event, User user) {
        this.id = id;
        this.message = message;
        this.publishedAt = publishedAt;
        this.event = event;
        this.user = user;
    }

    public Message(String message, String publishedAt) {
        this.message = message;
        this.publishedAt = publishedAt;
    }

    public Message(String string, String date, Event event1, User user1) {
        this.message = string;
        this.publishedAt = date;
        this.event = event1;
        this.user = user1;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
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

    public String getPublishedAt() {
        return publishedAt;
    }

    public void setPublishedAt(String publishedAt) {
        this.publishedAt = publishedAt;
    }

    @Override
    public String toString() {
        return "Message [id=" + id + ", message=" + message + "]\n";
    }

}
