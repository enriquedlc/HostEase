package com.hostease.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "message_table")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "message", nullable = false)
    private String message;

    @Column(name = "published_at", nullable = false, columnDefinition = "DATETIME default CURRENT_TIMESTAMP")
    private Date publishedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_event_id", nullable = false)
    private Event event;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_user_id", nullable = false)
    private User user;

    public Message() {
    }

    public Message(Long id, String message, Date publishedAt, Event event, User user) {
        this.id = id;
        this.message = message;
        this.publishedAt = publishedAt;
        this.event = event;
        this.user = user;
    }

    public Message(String message, Date publishedAt) {
        this.message = message;
        this.publishedAt = publishedAt;
    }

    public Message(String string, Date date, Event event1, User user1) {
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

    @Override
    public String toString() {
        return "Message [id=" + id + ", message=" + message + "]\n";
    }

}
