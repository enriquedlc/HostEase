package com.hostease.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hostease.entity.Event;

public interface EventRepository extends JpaRepository<Event, Long> {

}
