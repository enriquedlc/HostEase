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

    public boolean likeEvent(Long eventId, Long userId) {
        Event event = eventRepository.findById(eventId).orElse(null);
        User user = userRepository.findById(userId).orElse(null);

        if (event == null || user == null) {
            return false; // No se encontró el evento o el usuario correspondiente
        }

        Like existingLike = user.getLikes()
                .stream()
                .filter(like -> like.getEvent().getId().equals(eventId))
                .findFirst()
                .orElse(null);

        if (existingLike != null && existingLike.getLiked()) {
            user.getLikes().remove(existingLike);
            event.getLikes().remove(existingLike);
            likeRepository.delete(existingLike);
            return false; // El like ya existía y fue eliminado
        }

        Like newLike = new Like();
        newLike.setLikedAt("2019-01-01 00:00:00");
        newLike.setLiked(true);
        newLike.setEvent(event);
        newLike.setUser(user);
        user.getLikes().add(newLike);
        event.getLikes().add(newLike);

        Like savedLike = likeRepository.save(newLike); // Se crea el nuevo like
        return savedLike != null; // Devuelve true si se guardó correctamente, false en caso contrario
    }

}
