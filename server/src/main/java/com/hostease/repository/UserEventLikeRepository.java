package com.hostease.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hostease.entity.UserEventLike;
import com.hostease.entity.UserEventLikeId;

public interface UserEventLikeRepository extends JpaRepository<UserEventLike, UserEventLikeId> {

}
