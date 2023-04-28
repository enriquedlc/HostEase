package com.hostease.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hostease.entity.Category;
import com.hostease.enums.HttpStatusEnum;
import com.hostease.enums.JsonResponseMessageEnum;
import com.hostease.service.CategoryService;
import com.hostease.utils.ControllerJsonResponseMap;

@RestController
@RequestMapping("/hostease")
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    @GetMapping("/categories")
    public ResponseEntity<Map<String, Object>> findAll() {

        List<Category> categories = categoryService.findAll();

        return new ControllerJsonResponseMap().jsonResponseMapListGenerator(
                categories,
                HttpStatusEnum.STATUS_200_OK.getStatus(),
                JsonResponseMessageEnum.SUCCESSFULLY_RETRIEVED_DATA.getMessage(),
                JsonResponseMessageEnum.ERROR_RETRIEVING_DATA.getMessage());
    }

    @GetMapping("categories/{id}")
    public ResponseEntity<Map<String, Object>> findById(@PathVariable("id") Long id) {

        Category category = categoryService.findById(id);

        return new ControllerJsonResponseMap().jsonResponseMapObjectGenerator(
                category,
                HttpStatusEnum.STATUS_200_OK.getStatus(),
                JsonResponseMessageEnum.SUCCESSFULLY_RETRIEVED_DATA.getMessage(),
                JsonResponseMessageEnum.ERROR_RETRIEVING_DATA.getMessage());
    }

    @PostMapping("/categories")
    public ResponseEntity<Map<String, Object>> save(@RequestBody Category category) {

        Category catetoryToSave = categoryService.save(category);

        return new ControllerJsonResponseMap().jsonResponseMapObjectGenerator(
                catetoryToSave,
                HttpStatusEnum.STATUS_201_CREATED.getStatus(),
                JsonResponseMessageEnum.SUCCESSFULLY_SAVED_DATA.getMessage(),
                JsonResponseMessageEnum.ERROR_SAVING_DATA.getMessage());
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<Map<String, Object>> update(@PathVariable("id") Long id, @RequestBody Category category) {

        Category categoryToUpdate = categoryService.update(category, id);

        return new ControllerJsonResponseMap().jsonResponseMapObjectGenerator(
                categoryToUpdate,
                HttpStatusEnum.STATUS_200_OK.getStatus(),
                JsonResponseMessageEnum.SUCCESSFULLY_UPDATED_DATA.getMessage(),
                JsonResponseMessageEnum.ERROR_UPDATING_DATA.getMessage());
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<Map<String, Object>> delete(@PathVariable("id") Long id) {

        categoryService.deleteById(id);

        return new ControllerJsonResponseMap().jsonResponseMapObjectGenerator(
                null,
                HttpStatusEnum.STATUS_200_OK.getStatus(),
                JsonResponseMessageEnum.SUCCESSFULLY_DELETED_DATA.getMessage(),
                JsonResponseMessageEnum.ERROR_DELETING_DATA.getMessage());
    }

}
