package com.hostease.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hostease.entity.Tag;

public interface TagRepository extends JpaRepository<Tag, Long> {

}
