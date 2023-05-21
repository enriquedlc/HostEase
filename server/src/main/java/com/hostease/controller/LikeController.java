package com.hostease.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hostease.service.LikeService;
import com.hostease.utils.ControllerJsonResponseMap;

@RestController
@RequestMapping("/hostease")
@CrossOrigin("*")
public class LikeController {

    @Autowired
    LikeService likeService;

    @PostMapping("/event/like")
    public ResponseEntity<Map<String, Object>> likeEvent(@RequestParam Long eventId, @RequestParam Long userId) {

        return new ControllerJsonResponseMap().jsonResponseMapObjectGenerator(
                likeService.likeEvent(eventId, userId),
                "Like successfully created",
                "Liked event successfully " + eventId + " for user with id: " + userId,
                "Error creating like");

    }

}
