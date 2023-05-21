package com.hostease.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hostease.entity.Like;
import com.hostease.service.LikeService;

@RestController
@RequestMapping("/hostease")
@CrossOrigin("*")
public class LikeController {

    @Autowired
    LikeService likeService;

    @PostMapping("/event/like")
    public Like likeEvent(@RequestParam Long eventId, @RequestParam Long userId) {
        return likeService.likeEvent(eventId, userId);
    }

}
