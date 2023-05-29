package com.hostease.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hostease.entity.UserAchievement;
import com.hostease.entity.UserAchievementId;

public interface UserAchievementRepository extends JpaRepository<UserAchievement, UserAchievementId> {

}
