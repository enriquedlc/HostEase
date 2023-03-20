package com.hostease.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hostease.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}
