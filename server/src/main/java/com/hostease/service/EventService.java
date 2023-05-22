package com.hostease.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hostease.entity.Category;
import com.hostease.entity.Event;
import com.hostease.entity.Tag;
import com.hostease.entity.User;
import com.hostease.repository.EventRepository;
import com.hostease.repository.TagRepository;
import com.hostease.repository.UserRepository;

@Service
public class EventService {

    @Autowired
    EventRepository eventRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    TagRepository tagRepository;

    @Autowired
    CategoryService categoryService;

    public List<Event> findByUserId(Long id) {
        return eventRepository.findEventsByUsersId(id);
    }

    public List<Event> findAll() {
        return eventRepository.findAll();
    }

    public Event findById(Long id) {
        return eventRepository.findById(id).get();
    }

    public Event save(Event event, Long categoryId) {
        event.setCategory(eventRepository.findById(categoryId).get().getCategory());
        return eventRepository.save(event);
    }

    public Event save(Event event, Long categoryId, Long ownerId) {

        User user = userRepository.findById(ownerId).get();
        Category category = categoryService.findById(categoryId);

        event.setOwner(user);
        event.setCategory(category);

        Set<Tag> tagsToSave = new HashSet<>();
        for (Tag tag : event.getTags()) {
            Tag managedTag = tagRepository.findById(tag.getId()).get();

            tagsToSave.add(managedTag);
            managedTag.getEvents().add(event);
        }
        event.setTags(tagsToSave);

        event.setOwner(userRepository.findById(ownerId).get());
        event.setCategory(eventRepository.findById(categoryId).get().getCategory());
        return eventRepository.save(event);
    }

    public Event update(Event event, Long id) {
        eventRepository.findById(id).ifPresent(eventToUpdate -> {
            eventToUpdate.setTitle(event.getTitle());
            eventToUpdate.setDescription(event.getDescription());
            eventToUpdate.setStartDate(event.getStartDate());
            eventToUpdate.setEndDate(event.getEndDate());
            eventToUpdate.setStartTime(event.getStartTime());
            eventToUpdate.setEndTime(event.getEndTime());
            eventToUpdate.setLocation(event.getLocation());
            eventToUpdate.setMaxCapacity(event.getMaxCapacity());
            eventToUpdate.setPhoto(event.getPhoto());
            eventRepository.save(eventToUpdate);
        });
        return eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
    }

    public void deleteById(Long id) {
        eventRepository.deleteById(id);
    }

    public boolean manageUserOnEvent(Long eventId, Long userId) {
        User user = userRepository.findById(userId).get();
        Event event = eventRepository.findById(eventId).get();

        boolean result = true;

        if (event.getUsers().contains(user)) {
            result = false;
            event.getUsers().remove(user);
            user.getEvents().remove(event);
        } else {
            event.getUsers().add(user);
            user.getEvents().add(event);
        }

        userRepository.save(user);
        eventRepository.save(event);
        return result;
    }

}
