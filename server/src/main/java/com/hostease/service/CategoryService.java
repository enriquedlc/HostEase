package com.hostease.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hostease.entity.Category;
import com.hostease.repository.CategoryRepository;

@Service
public class CategoryService {

    @Autowired
    CategoryRepository categoryRepository;

    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    public Category findById(Long id) {
        return categoryRepository.findById(id).get();
    }

    public Category save(Category category) {
        return categoryRepository.save(category);
    }

    public Category update(Category category, Long id) {
        categoryRepository.findById(id).ifPresent(categoryToUpdate -> {
            categoryToUpdate.setCategoryName(category.getCategoryName());
            categoryRepository.save(categoryToUpdate);
        });
        return categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
    }

    public void deleteById(Long id) {
        categoryRepository.deleteById(id);
    }

}
