package com.hostease.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hostease.entity.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {

    public List<Message> findByEventId(Long id);

}
