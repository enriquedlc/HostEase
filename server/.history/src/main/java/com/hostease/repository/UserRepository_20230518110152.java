package com.hostease.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hostease.entity.Event;
import com.hostease.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

    List<Event> findEventsByUserId(Long userId);

}
