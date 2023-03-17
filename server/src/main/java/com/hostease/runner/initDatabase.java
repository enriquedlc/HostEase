package com.hostease.runner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import com.hostease.entity.Event;
import com.hostease.entity.Tag;
import com.hostease.repository.EventRepository;
import com.hostease.repository.TagRepository;

@Component
@Order(value = 1)
public class initDatabase implements CommandLineRunner {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private TagRepository tagRepository;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("initializing Database...");

        // EVENTS
        Event event1 = new Event(1L, "Event 1", "Description 1", "2020-01-01", "2020-01-01", "12:00", "13:00", 1.0, 1.0,
                10L, 0D);
        Event event2 = new Event(2L, "Event 2", "Description 2", "2020-01-01", "2020-01-01", "12:00", "13:00", 1.0, 1.0,
                10L, 0D);
        Event event3 = new Event(3L, "Event 3", "Description 3", "2020-01-01", "2020-01-01", "12:00", "13:00", 1.0, 1.0,
                10L, 0D);
        Event event4 = new Event(4L, "Event 4", "Description 4", "2020-01-01", "2020-01-01", "12:00", "13:00", 1.0, 1.0,
                10L, 0D);

        // TAGS
        Tag tag1 = new Tag(1L, "Tag 1");
        Tag tag2 = new Tag(2L, "Tag 2");
        Tag tag3 = new Tag(3L, "Tag 3");
        Tag tag4 = new Tag(4L, "Tag 4");

        // SAVE TAGS
        tagRepository.save(tag1);
        tagRepository.save(tag2);
        tagRepository.save(tag3);
        tagRepository.save(tag4);

        // SAVE EVENTS
        eventRepository.save(event1);
        eventRepository.save(event2);
        eventRepository.save(event3);
        eventRepository.save(event4);

        System.out.println("Database initialized");
    }

}
