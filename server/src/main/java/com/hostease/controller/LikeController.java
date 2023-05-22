package com.hostease.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hostease.enums.HttpStatusEnum;
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

        boolean like = likeService.likeEvent(eventId, userId);

        return new ControllerJsonResponseMap().jsonResponseMapObjectGenerator(
                like,
                like ? HttpStatusEnum.STATUS_201_CREATED.getStatus() : HttpStatusEnum.STATUS_200_OK.getStatus(),
                like ? "Liked event " + eventId + " successfully for user with id: " + userId : "removed like from event " + eventId + " successfully for user with id: " + userId,
                like ? "Error liking event " + eventId + " for user with id: " + userId : "Error unliking event " + eventId + " for user with id: " + userId);
    }

}
