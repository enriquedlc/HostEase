package com.hostease.runner;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import com.hostease.entity.Achievement;
import com.hostease.entity.Category;
import com.hostease.entity.Event;
import com.hostease.entity.Like;
import com.hostease.entity.Message;
import com.hostease.entity.Tag;
import com.hostease.entity.User;
import com.hostease.models.Location;
import com.hostease.repository.AchievementRepository;
import com.hostease.repository.CategoryRepository;
import com.hostease.repository.EventRepository;
import com.hostease.repository.LikeRepository;
import com.hostease.repository.MessageRepository;
import com.hostease.repository.TagRepository;
import com.hostease.repository.UserRepository;

@Component
@Order(value = 1)
public class InitDatabase implements CommandLineRunner {

        @Autowired
        private EventRepository eventRepository;

        @Autowired
        private TagRepository tagRepository;

        @Autowired
        private CategoryRepository categoryRepository;

        @Autowired
        private UserRepository userRepository;

        @Autowired
        private AchievementRepository achievementRepository;

        @Autowired
        private MessageRepository messageRepository;

        @Autowired
        private LikeRepository likeRepository;

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
                Tag tag1 = new Tag("Tag 1", "red");
                Tag tag2 = new Tag("Tag 2", "blue");
                Tag tag3 = new Tag("Tag 3", "green");
                Tag tag4 = new Tag("Tag 4", "yellow");

                // USERS
                User user1 = new User("nickNameUser1", "user1email@gmail.com",
                                "$2a$10$GNLnjxfAGA/0E7idq.2OruVeGWCOIVPVh4y943isTzIHHplKeVOM.", "687779560",
                                0L, LocalDateTime.of(2023, 4, 15, 0, 0, 0));

                User user2 = new User("nickNameUser2", "user2email@gmail.com",
                                "$2a$10$GNLnjxfAGA/0E7idq.2OruVeGWCOIVPVh4y943isTzIHHplKeVOM.", "687779560",
                                100L, LocalDateTime.of(2023, 4, 15, 0, 0, 0));

                User user3 = new User("nickNameUser3", "user3email@gmail.com",
                                "$2a$10$GNLnjxfAGA/0E7idq.2OruVeGWCOIVPVh4y943isTzIHHplKeVOM.", "687779560",
                                100L, LocalDateTime.of(2023, 3, 15, 0, 0, 0));

                User user4 = new User("nickNameUser4", "user4email@gmail.com",
                                "$2a$10$GNLnjxfAGA/0E7idq.2OruVeGWCOIVPVh4y943isTzIHHplKeVOM.", "687779560",
                                100L, LocalDateTime.of(2023, 3, 15, 0, 0, 0));

                User user5 = new User("nickNameUser5", "user5email@gmail.com",
                                "$2a$10$GNLnjxfAGA/0E7idq.2OruVeGWCOIVPVh4y943isTzIHHplKeVOM.", "687779560",
                                100L, LocalDateTime.of(2023, 1, 15, 0, 0, 0));

                // CREATE ADMIN USER
                User admin1 = new User("nickNameAdmin1", "admin1@gmail.com",
                                "$2a$10$GNLnjxfAGA/0E7idq.2OruVeGWCOIVPVh4y943isTzIHHplKeVOM.",
                                "698546054", 0L, LocalDateTime.now(), "ADMIN");

                // EVENTS
                Event event1 = new Event(user1, "Event 1", "Description 1", "2023/05/05", "2023/05/21", "12:00",
                                "13:00",
                                new Location(50.3785D, 14.9706D),
                                10L, category1);
                Event event2 = new Event(user1, "Event 2", "Description 2", "2023/04/05", "2023/05/06", "12:00",
                                "13:00",
                                new Location(50.3785D, 14.9706D),
                                10L, category2);
                Event event3 = new Event(user1, "Event 3", "Description 3", "2023/02/05", "2023/05/30", "12:00",
                                "13:00",
                                new Location(50.3785D, 14.9706D),
                                10L, category3);
                Event event4 = new Event(user1, "Event 4", "Description 4", "2023/12/05", "2023/05/19", "12:00",
                                "13:00",
                                new Location(50.3785D, 14.9706D),
                                10L, category4);

                // ACHIEVEMENTS
                Achievement achievement1 = new Achievement("Achievement description 1", 100L, 1D);
                Achievement achievement2 = new Achievement("Achievement description 2", 200L, 2D);
                Achievement achievement3 = new Achievement("Achievement description 3", 300L, 3D);

                // MESSAGES
                // Message message1 = new Message("Message body example 1", new Date(), event1,
                // user1);
                Message message2 = new Message("Message body example 2", "2023-05-19 23:51:30");
                Message message3 = new Message("Message body example 3", "2023-05-19 23:51:30");
                Message message4 = new Message("Message body example 4", "2023-03-19 23:51:30", event2, user3);
                Message message5 = new Message("Message body example 5", "2023-04-19 23:51:30", event3, user4);
                Message message6 = new Message("Message body example 7", "2023-04-19 23:51:30", event4, user4);

                // LIKES
                Like like3 = new Like(event1, user3, true, "2023-04-19 23:51:30");

                Like like4 = new Like(event2, user1, true, "2023-04-19 23:51:30");
                Like like5 = new Like(event2, user2, true, "2023-04-19 23:51:30");

                Like like6 = new Like(event3, user1, true, "2023-04-19 23:51:30");
                Like like7 = new Like(event3, user2, true, "2023-04-19 23:51:30");
                Like like8 = new Like(event3, user3, true, "2023-04-19 23:51:30");
                Like like9 = new Like(event3, user4, true, "2023-04-19 23:51:30");

                Like like10 = new Like(event4, user1, true, "2023-04-19 23:51:30");
                Like like11 = new Like(event4, user2, true, "2023-04-19 23:51:30");

                // SAVE USERS
                userRepository.save(user1);
                userRepository.save(user2);
                userRepository.save(user3);
                userRepository.save(user4);
                userRepository.save(user5);
                userRepository.save(admin1);

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

                // SAVE ACHIEVEMENTS
                achievementRepository.save(achievement1);
                achievementRepository.save(achievement2);
                achievementRepository.save(achievement3);

                // SET THE CATEGORIES FOR THE EVENTS
                Set<Event> eventsToAsingCategory1 = new HashSet<Event>(Arrays.asList(event1));
                category1.setEvents(eventsToAsingCategory1);
                event1.setCategory(category1);
                categoryRepository.save(category1);

                Set<Event> eventsToAsignCategory2 = new HashSet<Event>(Arrays.asList(event2));
                category2.setEvents(eventsToAsignCategory2);
                event2.setCategory(category2);
                categoryRepository.save(category2);

                Set<Event> eventsToAsignCategory3 = new HashSet<Event>(Arrays.asList(event3));
                category3.setEvents(eventsToAsignCategory3);
                event3.setCategory(category3);
                categoryRepository.save(category3);

                Set<Event> eventsToAsignCategory4 = new HashSet<Event>(Arrays.asList(event4));
                category4.setEvents(eventsToAsignCategory4);
                event4.setCategory(category4);
                categoryRepository.save(category4);

                // SET THE TAGS FOR THE EVENTS
                Set<Event> eventsToAsignTag1 = new HashSet<Event>(
                                Arrays.asList(event1, event4));
                tag1.setEvents(eventsToAsignTag1);
                event1.getTags().add(tag1);
                event2.getTags().add(tag1);
                tagRepository.save(tag1);

                Set<Event> eventsToAsignTag2 = new HashSet<Event>(
                                Arrays.asList(event1, event3));
                tag2.setEvents(eventsToAsignTag2);
                event1.getTags().add(tag2);
                event3.getTags().add(tag2);
                tagRepository.save(tag2);

                Set<Event> eventsToAsignTag3 = new HashSet<Event>(
                                Arrays.asList(event2, event4));
                tag3.setEvents(eventsToAsignTag3);
                event2.getTags().add(tag3);
                event4.getTags().add(tag3);
                tagRepository.save(tag3);

                Set<Event> eventsToAsignTag4 = new HashSet<Event>(
                                Arrays.asList(event3, event4));
                tag4.setEvents(eventsToAsignTag4);
                event3.getTags().add(tag4);
                event4.getTags().add(tag4);
                tagRepository.save(tag4);

                // SET THE USERS INTO THE EVENTS
                Set<Event> eventsToAsignUser1 = new HashSet<Event>(
                                Arrays.asList(event1, event2, event3, event4));
                user1.setEvents(eventsToAsignUser1);
                event1.getUsers().add(user1);
                event2.getUsers().add(user1);
                userRepository.save(user1);

                Set<Event> eventsToAsignUser2 = new HashSet<Event>(
                                Arrays.asList(event1, event3));
                user2.setEvents(eventsToAsignUser2);
                event1.getUsers().add(user2);
                event3.getUsers().add(user2);
                userRepository.save(user2);

                Set<Event> eventsToAsignUser3 = new HashSet<Event>(
                                Arrays.asList(event2, event4));
                user3.setEvents(eventsToAsignUser3);
                event2.getUsers().add(user3);
                event4.getUsers().add(user3);
                userRepository.save(user3);

                Set<Event> eventsToAsignUser4 = new HashSet<Event>(
                                Arrays.asList(event3, event4));
                user4.setEvents(eventsToAsignUser4);
                event3.getUsers().add(user4);
                event4.getUsers().add(user4);
                userRepository.save(user4);

                Set<Event> eventsToAsignUser5 = new HashSet<Event>(
                                Arrays.asList(event3, event4));
                user5.setEvents(eventsToAsignUser5);
                event3.getUsers().add(user5);
                event4.getUsers().add(user5);
                userRepository.save(user5);

                // SET THE EVENTS AS OWNERSHIP OF USER 1

                Set<Event> ownedEventsForUser1 = new HashSet<Event>(
                                Arrays.asList(event1, event2, event3, event4));

                user1.setOwnedEvents(ownedEventsForUser1);

                // SET THE ACHIEVEMENTS INTO THE USERS
                Set<Achievement> achievementsToAsignUser1 = new HashSet<Achievement>(
                                Arrays.asList(achievement1, achievement2, achievement3));
                user1.setAchievements(achievementsToAsignUser1);
                achievement1.getUsers().add(user1);
                achievement2.getUsers().add(user1);
                achievement3.getUsers().add(user1);
                userRepository.save(user1);

                Set<Achievement> achievementsToAsignUser2 = new HashSet<Achievement>(
                                Arrays.asList(achievement1, achievement2));
                user2.setAchievements(achievementsToAsignUser2);
                achievement1.getUsers().add(user2);
                achievement2.getUsers().add(user2);
                userRepository.save(user2);

                Set<Achievement> achievementsToAsignUser3 = new HashSet<Achievement>(
                                Arrays.asList(achievement1, achievement3));
                user3.setAchievements(achievementsToAsignUser3);
                achievement1.getUsers().add(user3);
                achievement3.getUsers().add(user3);
                userRepository.save(user3);

                Set<Achievement> achievementsToAsignUser4 = new HashSet<Achievement>(
                                Arrays.asList(achievement2, achievement3));
                user4.setAchievements(achievementsToAsignUser4);
                achievement2.getUsers().add(user4);
                achievement3.getUsers().add(user4);
                userRepository.save(user4);

                // /*
                // * MESSAGES
                // *
                // * - The messages are not saved up like the rest of the entities.
                // *
                // * 1. One way to save a message properly is to construct the message
                // * with the user and the event as parameters and then save the message.
                // *
                // * Next we need to set the message into the user and the event, finally
                // * we save the message again with the messageRepository.
                // * (example: First example)
                // *
                // * 2. The second way is to construct the message with only the body and
                // * the date as parameters and not saving it yet.
                // *
                // * Next we need to set the message into the user and the event, then
                // * we set the user and the event to the message and finally we save the
                // * message with the messageRepository.
                // * (example: Second example)
                // *
                // */

                // SET THE MESSAGES INTO THE USERS AND EVENTS
                // First example
                Message message1 = new Message();
                message1.setMessage("hola este es el primer mensaje");
                message1.setPublishedAt("2023-04-19 23:51:30");
                message1.setUser(user1);
                message1.setEvent(event1);

                user1.getMessages().add(message1);
                event1.getMessages().add(message1);
                messageRepository.save(message1);
                userRepository.save(user1);
                eventRepository.save(event1);

                user3.getMessages().add(message4);
                event2.getMessages().add(message4);
                messageRepository.save(message4);

                user4.getMessages().add(message5);
                event3.getMessages().add(message5);
                messageRepository.save(message5);

                user4.getMessages().add(message6);
                event4.getMessages().add(message6);
                messageRepository.save(message6);

                // Second example
                user2.getMessages().add(message2);
                event2.getMessages().add(message2);

                message2.setUser(user2);
                message2.setEvent(event2);
                messageRepository.save(message2);

                // Second example
                user5.getMessages().add(message3);
                event4.getMessages().add(message3);

                message3.setUser(user5);
                message3.setEvent(event4);
                messageRepository.save(message3);

                // FOLLOWERS
                user1.setFollowers(new HashSet<>(Arrays.asList(user2)));

                user1.getFollowing().add(user2);
                userRepository.save(user1);

                user2.setFollowers(new HashSet<>(Arrays.asList(user1)));

                user2.getFollowing().add(user1);
                userRepository.save(user1);
                userRepository.save(user2);

                user3.setFollowers(new HashSet<>(Arrays.asList(user2, user4, user5)));

                user3.getFollowing().add(user2);
                user3.getFollowing().add(user4);
                user3.getFollowing().add(user5);
                userRepository.save(user3);

                user4.setFollowers(new HashSet<>(Arrays.asList(user1, user2, user3, user5)));

                user4.getFollowing().add(user1);
                user4.getFollowing().add(user2);
                user4.getFollowing().add(user3);
                user4.getFollowing().add(user4);
                userRepository.save(user4);

                // user5.setFollowers(new HashSet<>(Arrays.asList(user2, user4)));

                // /*
                // * LIKES
                // *
                // * 1. In order to save the likes we can construct it step by step:
                // *
                // * - Firstable we set the event and the user to the like
                // * - Next we set the like's state to true and give a date
                // * and the hour when this happened
                // * - Then we get the likes from the user and add
                // * the current like, same with the event and
                // * - Finally we save the like using the likeRepository.
                // * (First example)
                // *
                // * 2. Other way to save the likes:
                // * - Firstable we need to construct the like with the user,
                // * the event, the state of liked and the date it
                // * happened as parameters.
                // * - Then we need to set the event and the user to the like, next
                // * we need to set the like into the event and the user and finally
                // * we save the like using the likeRepository.
                // * (Second example)
                // *
                // */

                // First example
                Like like1 = new Like();
                like1.setEvent(event1);
                like1.setUser(user1);
                like1.setLiked(true);
                like1.setLikedAt("2019-01-01 00:00:00");
                user1.getLikes().add(like1);
                event1.getLikes().add(like1);
                likeRepository.save(like1);

                Like like2 = new Like();
                like2.setEvent(event1);
                like2.setUser(user2);
                like2.setLiked(true);
                like2.setLikedAt("2019-01-01 00:00:00");
                user2.getLikes().add(like2);
                event1.getLikes().add(like2);
                likeRepository.save(like2);

                // Second example
                like3.setEvent(event1);
                like3.setUser(user3);
                user3.getLikes().add(like3);
                event1.getLikes().add(like3);
                likeRepository.save(like3);

                like4.setEvent(event2);
                like4.setUser(user1);
                user1.getLikes().add(like4);
                event2.getLikes().add(like4);
                likeRepository.save(like4);

                like5.setEvent(event2);
                like5.setUser(user2);
                user2.getLikes().add(like5);
                event2.getLikes().add(like5);
                likeRepository.save(like5);

                like6.setEvent(event3);
                like6.setUser(user1);
                user1.getLikes().add(like6);
                event3.getLikes().add(like6);
                likeRepository.save(like6);

                like7.setEvent(event3);
                like7.setUser(user2);
                user2.getLikes().add(like7);
                event3.getLikes().add(like7);
                likeRepository.save(like7);

                like8.setEvent(event3);
                like8.setUser(user3);
                user3.getLikes().add(like8);
                event3.getLikes().add(like8);
                likeRepository.save(like8);

                like9.setEvent(event3);
                like9.setUser(user4);
                user4.getLikes().add(like9);
                event3.getLikes().add(like9);
                likeRepository.save(like9);

                like10.setEvent(event4);
                like10.setUser(user1);
                user1.getLikes().add(like10);
                event4.getLikes().add(like10);
                likeRepository.save(like10);

                like11.setEvent(event4);
                like11.setUser(user2);
                user2.getLikes().add(like11);
                event4.getLikes().add(like11);
                likeRepository.save(like11);

                eventRepository.save(event1);
                eventRepository.save(event2);
                eventRepository.save(event3);
                eventRepository.save(event4);

                System.out.println("Database initialized");

        }

}
