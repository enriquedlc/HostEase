package com.hostease.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hostease.entity.Like;

public interface LikeRepository extends JpaRepository<Like, Long> {

}
