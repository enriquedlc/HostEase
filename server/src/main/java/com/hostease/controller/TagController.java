package com.hostease.controller;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hostease.entity.Tag;
import com.hostease.enums.HttpStatusEnum;
import com.hostease.service.TagService;

@RestController
@RequestMapping("/hostease")
public class TagController {

    @Autowired
    TagService tagService;

    @GetMapping("/tags")
    public ResponseEntity<?> findAll() {
        Map<String, Object> response = new LinkedHashMap<String, Object>();

        try {
            List<Tag> tags = tagService.findAll();

            response.put("status", HttpStatusEnum.STATUS_200_OK.getStatus());
            response.put("message", "Tags successfully retrieved");
            response.put("data", tags);

            return ResponseEntity.status(200).body(response);

        } catch (Exception e) {
            response.put("status", HttpStatusEnum.STATUS_500_INTERNAL_SERVER_ERROR.getStatus());
            response.put("message", "Error retrieving tags");
            response.put("error", e.getMessage());
            response.put("data", null);

            return ResponseEntity.status(500).body(response);
        }

    }

    @GetMapping("/tags/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Long id) {
        Map<String, Object> response = new LinkedHashMap<String, Object>();

        try {
            Tag tag = tagService.findById(id);

            response.put("status", HttpStatusEnum.STATUS_200_OK.getStatus());
            response.put("message", "Tag successfully retrieved");
            response.put("data", tag);

            return ResponseEntity.status(200).body(response);

        } catch (Exception e) {
            response.put("status", HttpStatusEnum.STATUS_500_INTERNAL_SERVER_ERROR.getStatus());
            response.put("message", "Error retrieving tag");
            response.put("error", e.getMessage());
            response.put("data", null);

            return ResponseEntity.status(500).body(response);
        }

    }

    @PostMapping("/tags")
    public ResponseEntity<?> save(@RequestBody Tag tag) {
        Map<String, Object> response = new LinkedHashMap<String, Object>();

        try {
            Tag tagToSave = tagService.save(tag);

            response.put("status", HttpStatusEnum.STATUS_201_CREATED.getStatus());
            response.put("message", "Tag successfully saved");
            response.put("data", tagToSave);

            return ResponseEntity.status(200).body(response);

        } catch (Exception e) {
            response.put("status", HttpStatusEnum.STATUS_500_INTERNAL_SERVER_ERROR.getStatus());
            response.put("message", "Error saving tag");
            response.put("error", e.getMessage());
            response.put("data", null);

            return ResponseEntity.status(500).body(response);
        }

    }

    @DeleteMapping("/tags/{id}")
    public ResponseEntity<?> deleteById(@PathVariable("id") Long id) {
        Map<String, Object> response = new LinkedHashMap<String, Object>();

        try {
            Tag tag = tagService.findById(id);
            tagService.deleteById(id);

            response.put("status", HttpStatusEnum.STATUS_200_OK.getStatus());
            response.put("message", String.format("Tag %s successfully deleted", tag.getTag()));

            return ResponseEntity.status(200).body(response);

        } catch (Exception e) {
            response.put("status", HttpStatusEnum.STATUS_500_INTERNAL_SERVER_ERROR.getStatus());
            response.put("message", "Error deleting tag");
            response.put("error", e.getMessage());
            response.put("data", null);

            return ResponseEntity.status(500).body(response);
        }

    }

}
