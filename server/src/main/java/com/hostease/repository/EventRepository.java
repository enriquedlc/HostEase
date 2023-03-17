package com.hostease.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import antlr.debug.Event;

public interface EventRepository extends JpaRepository<Event, Long> {

}
