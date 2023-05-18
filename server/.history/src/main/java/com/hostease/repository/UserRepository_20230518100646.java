package com.hostease.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hostease.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    public User findByEmail(String email);

}
