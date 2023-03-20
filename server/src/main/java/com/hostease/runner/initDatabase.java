package com.hostease.runner;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import com.hostease.entity.Category;
import com.hostease.entity.Event;
import com.hostease.entity.Tag;
import com.hostease.repository.CategoryRepository;
import com.hostease.repository.EventRepository;
import com.hostease.repository.TagRepository;

@Component
@Order(value = 1)
public class initDatabase implements CommandLineRunner {

        @Autowired
        private EventRepository eventRepository;

        @Autowired
        private TagRepository tagRepository;

        @Autowired
        private CategoryRepository categoryRepository;

        @Override
        public void run(String... args) throws Exception {
                System.out.println("initializing Database...");

                // CATEGORIES
                Category category1 = new Category("Category 1");
                Category category2 = new Category("Category 2");
                Category category3 = new Category("Category 3");
                Category category4 = new Category("Category 4");
                Category category5 = new Category("Category 5");

                // TAGS
                Tag tag1 = new Tag(1L, "Tag 1");
                Tag tag2 = new Tag(2L, "Tag 2");
                Tag tag3 = new Tag(3L, "Tag 3");
                Tag tag4 = new Tag(4L, "Tag 4");

                // EVENTS
                Event event1 = new Event(1L, "Event 1", "Description 1", "2020-01-01", "2020-01-01", "12:00", "13:00",
                                1.0, 1.0,
                                10L, 0D, category1);
                Event event2 = new Event(2L, "Event 2", "Description 2", "2020-01-01", "2020-01-01", "12:00", "13:00",
                                1.0, 1.0,
                                10L, 0D, category3);
                Event event3 = new Event(3L, "Event 3", "Description 3", "2020-01-01", "2020-01-01", "12:00", "13:00",
                                1.0, 1.0,
                                10L, 0D, category4);
                Event event4 = new Event(4L, "Event 4", "Description 4", "2020-01-01", "2020-01-01", "12:00", "13:00",
                                1.0, 1.0,
                                10L, 0D, category1);

                // SAVE CATEGORIES
                categoryRepository.save(category1);
                categoryRepository.save(category2);
                categoryRepository.save(category3);
                categoryRepository.save(category4);
                categoryRepository.save(category5);

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

                // SET THE TAGS FOR THE EVENTS
                Set<Event> eventsToAsignTag1 = new HashSet<Event>(
                                Arrays.asList(event1, event2));
                tag1.setEvents(eventsToAsignTag1);
                tagRepository.save(tag1);

                Set<Event> eventsToAsignTag2 = new HashSet<Event>(
                                Arrays.asList(event1, event3));
                tag2.setEvents(eventsToAsignTag2);
                tagRepository.save(tag2);

                Set<Event> eventsToAsignTag3 = new HashSet<Event>(
                                Arrays.asList(event2, event4));
                tag3.setEvents(eventsToAsignTag3);
                tagRepository.save(tag3);

                Set<Event> eventsToAsignTag4 = new HashSet<Event>(
                                Arrays.asList(event3, event4));
                tag4.setEvents(eventsToAsignTag4);
                tagRepository.save(tag4);

                System.out.println("Database initialized");
        }

}
