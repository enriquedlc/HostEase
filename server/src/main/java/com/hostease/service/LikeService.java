package com.hostease.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hostease.entity.Event;
import com.hostease.entity.Like;
import com.hostease.entity.User;
import com.hostease.repository.EventRepository;
import com.hostease.repository.LikeRepository;
import com.hostease.repository.UserRepository;

@Service
public class LikeService {

    @Autowired
    LikeRepository likeRepository;

    @Autowired
    EventRepository eventRepository;

    @Autowired
    UserRepository userRepository;

    public Like likeEvent(Long eventId, Long userId) {
        Event event = eventRepository.findById(eventId).get();
        User user = userRepository.findById(userId).get();
        Like like = new Like();

        like.setLikedAt("2019-01-01 00:00:00");
        like.setLiked(true);
        like.setEvent(event);
        like.setUser(user);
        user.getLikes().add(like);
        event.getLikes().add(like);

        return likeRepository.save(like);

    }

}
