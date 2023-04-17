package com.hostease.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hostease.entity.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {

}
