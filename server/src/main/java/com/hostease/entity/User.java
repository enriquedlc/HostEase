package com.hostease.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.Table;

@Entity
@Table(name = "user_table")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nickname", nullable = false, length = 45)
    private String nickname;

    @Column(name = "email", nullable = false, length = 70, unique = true)
    private String email;

    @Column(name = "password", nullable = false, length = 70)
    private String password;

    @Column(name = "name", nullable = false, length = 45)
    private String name;

    @Column(name = "surname", nullable = false, length = 60)
    private String surname;

    @Column(name = "experiencePoints", nullable = true)
    private Long experience;

    @Column(name = "joinedAt", nullable = false)
    private Date joinedAt;

    @PrePersist
    protected void onCreate() {
        joinedAt = new Date();
    }

}
