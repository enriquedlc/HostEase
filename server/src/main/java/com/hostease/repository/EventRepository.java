package com.hostease.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hostease.entity.Event;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findEventsByUsersId(Long userId);
    
}
