package com.hostease.entity;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.relational.core.mapping.Embedded.Nullable;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.hostease.serializer.CustomEventSerializer;

@Entity
@Table(name = "user_table")
@JsonIgnoreProperties({ "followers", "following", "likes", "messages", "achievements", "events" })
public class User {

    @ManyToMany(fetch = FetchType.LAZY, cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    })
    @JoinTable(name = "users_on_event_table", joinColumns = @JoinColumn(name = "fk_event_id"), inverseJoinColumns = @JoinColumn(name = "fk_user_id"))
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<Event> events = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY, cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    })

    @JoinTable(name = "user_achievement_table", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "achievement_id"))
    private Set<Achievement> achievements = new HashSet<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @Nullable
    private Set<Message> messages = new HashSet<Message>();

    @JsonSerialize(using = CustomEventSerializer.class)
    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Event> ownedEvents = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_followers", joinColumns = @JoinColumn(name = "following_user_id"), inverseJoinColumns = @JoinColumn(name = "followed_user_id"))
    private Set<User> followers = new HashSet<>();

    @JsonIgnore
    @ManyToMany(mappedBy = "followers", fetch = FetchType.LAZY)
    private Set<User> following = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Like> likes = new HashSet<Like>();

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nickname", nullable = false, length = 45)
    private String nickname;

    @Column(name = "email", nullable = false, length = 70, unique = true)
    private String email;

    @Column(name = "password", nullable = false, length = 70)
    private String password;

    @Column(name = "phone", nullable = false, length = 45)
    private String phone;

    @Column(name = "experiencePoints", nullable = true, columnDefinition = "bigint(20) default 0")
    private Long experience = 0L;

    @Column(name = "joinedAt", nullable = true, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime joinedAt = LocalDateTime.now();

    @Column(name = "role", nullable = false, length = 20, columnDefinition = "varchar(20) default 'USER'")
    private String role = "USER";

    public User() {
    }

    public User(String nickname, String email, String password, String phone,
            Long experience, LocalDateTime joinedAt) {
        this.nickname = nickname;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.experience = experience;
        this.joinedAt = joinedAt;
    }

    public User(String nickname, String email, String password, String phone,
            Long experience, LocalDateTime joinedAt, String role) {
        this.nickname = nickname;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.experience = experience;
        this.joinedAt = joinedAt;
        this.role = role;
    }

    public Set<Event> getEvents() {
        return events;
    }

    public void setEvents(Set<Event> events) {
        this.events = events;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Long getExperience() {
        return experience;
    }

    public void setExperience(Long experience) {
        this.experience = experience;
    }

    public LocalDateTime getJoinedAt() {
        return joinedAt;
    }

    public void setJoinedAt(LocalDateTime joinedAt) {
        this.joinedAt = joinedAt;
    }

    public Set<Achievement> getAchievements() {
        return achievements;
    }

    public void setAchievements(Set<Achievement> achievements) {
        this.achievements = achievements;
    }

    public Set<Message> getMessages() {
        return messages;
    }

    public void setMessages(Set<Message> messages) {
        this.messages = messages;
    }

    public Set<User> getFollowers() {
        return followers;
    }

    public void setFollowers(Set<User> followers) {
        this.followers = followers;
    }

    public Set<User> getFollowing() {
        return following;
    }

    public void setFollowing(Set<User> following) {
        this.following = following;
    }

    public Set<Like> getLikes() {
        return likes;
    }

    public void setLikes(Set<Like> likes) {
        this.likes = likes;
    }

    public Set<Event> getOwnedEvents() {
        return ownedEvents;
    }

    public void setOwnedEvents(Set<Event> ownedEvents) {
        this.ownedEvents = ownedEvents;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "User: " + this.nickname;
    }

}
