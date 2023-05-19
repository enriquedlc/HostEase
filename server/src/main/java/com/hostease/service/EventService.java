package com.hostease.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hostease.entity.Event;
import com.hostease.repository.EventRepository;

@Service
public class EventService {

    @Autowired
    EventRepository eventRepository;

    public List<Event> findByUserId(Long id) {
        return eventRepository.findEventsByUsersId(id);
    }

    public List<Event> findAll() {
        return eventRepository.findAll();
    }

    public Event findById(Long id) {
        return eventRepository.findById(id).get();
    }

    public Event save(Event event, Long id) {
        event.setCategory(eventRepository.findById(id).get().getCategory());
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

}
