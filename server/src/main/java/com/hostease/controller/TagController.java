package com.hostease.controller;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hostease.entity.Tag;
import com.hostease.enums.HttpStatusEnum;
import com.hostease.service.TagService;
import com.hostease.utils.ControllerJsonResponseMap;

@RestController
@RequestMapping("/hostease")
@CrossOrigin("*")
public class TagController {

    @Autowired
    TagService tagService;

    @GetMapping("/tags")
    public ResponseEntity<Map<String, Object>> findAll() {

        List<Tag> tags = tagService.findAll();

        return new ControllerJsonResponseMap().jsonResponseMapListGenerator(
                tags,
                HttpStatusEnum.STATUS_200_OK.getStatus(),
                "Tags successfully retrieved",
                "Error retrieving tags");
    }

    @GetMapping("/tags/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Long id) {

        Tag tag = tagService.findById(id);

        return new ControllerJsonResponseMap().jsonResponseMapObjectGenerator(
                tag,
                HttpStatusEnum.STATUS_200_OK.getStatus(),
                "Tag successfully retrieved",
                "Error retrieving tag");
    }

    @PostMapping("/tags")
    public ResponseEntity<Map<String, Object>> save(@RequestBody Tag tag) {

        Tag tagToSave = tagService.save(tag);

        return new ControllerJsonResponseMap().jsonResponseMapObjectGenerator(
                tagToSave,
                HttpStatusEnum.STATUS_201_CREATED.getStatus(),
                "Tag successfully created",
                "Error creating tag");
    }

    @PutMapping("/tags/{id}")
    public ResponseEntity<Map<String, Object>> update(@PathVariable("id") Long id, @RequestBody Tag tag) {

        Tag tagToUpdate = tagService.update(tag, id);

        return new ControllerJsonResponseMap().jsonResponseMapObjectGenerator(
                tagToUpdate,
                HttpStatusEnum.STATUS_200_OK.getStatus(),
                "Tag successfully updated",
                "Error updating tag");
    }

    @DeleteMapping("/tags/{id}")
    public ResponseEntity<?> deleteById(@PathVariable("id") Long id) {

        tagService.deleteById(id);

        Map<String, Object> responseMap = new LinkedHashMap<>();
        responseMap.put("status", HttpStatusEnum.STATUS_200_OK.getStatus());
        responseMap.put("message", "Tag successfully deleted");

        return ResponseEntity.ok().body(responseMap);
    }

}
