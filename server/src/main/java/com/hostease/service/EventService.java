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

    public void deleteById(Long id) {
        eventRepository.deleteById(id);
    }

}
