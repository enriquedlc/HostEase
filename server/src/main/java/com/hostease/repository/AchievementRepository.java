package com.hostease.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hostease.entity.Achievement;

public interface AchievementRepository extends JpaRepository<Achievement, Long> {
 
}
