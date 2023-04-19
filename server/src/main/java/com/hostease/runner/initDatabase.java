package com.hostease.runner;

import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import com.hostease.entity.Achievement;
import com.hostease.entity.Category;
import com.hostease.entity.Event;
import com.hostease.entity.Message;
import com.hostease.entity.Tag;
import com.hostease.entity.User;
import com.hostease.repository.AchievementRepository;
import com.hostease.repository.CategoryRepository;
import com.hostease.repository.EventRepository;
import com.hostease.repository.MessageRepository;
import com.hostease.repository.TagRepository;
import com.hostease.repository.UserRepository;

@Component
@Order(value = 1)
public class initDatabase implements CommandLineRunner {

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

                // USERS
                User user1 = new User("nickNameUser1", "user1email@gmail.com", "sha256...", "NameUser1", "SurnameUser1",
                                0L, new Date());

                User user2 = new User("nickNameUser2", "user2email@gmail.com", "sha256...", "NameUser2", "SurnameUser2",
                                100L, new Date());

                User user3 = new User("nickNameUser3", "user3email@gmail.com", "sha256...", "NameUser3", "SurnameUser3",
                                100L, new Date());

                User user4 = new User("nickNameUser4", "user4email@gmail.com", "sha256...", "NameUser4", "SurnameUser4",
                                100L, new Date());

                User user5 = new User("nickNameUser5", "user5email@gmail.com", "sha256...", "NameUser5", "SurnameUser5",
                                100L, new Date());

                // ACHIEVEMENTS
                Achievement achievement1 = new Achievement(1L, "Achievement description 1", 100L, 1D);
                Achievement achievement2 = new Achievement(2L, "Achievement description 2", 200L, 2D);
                Achievement achievement3 = new Achievement(3L, "Achievement description 3", 300L, 3D);

                // MESSAGES
                Message message1 = new Message("Message body example 1", new Date(), event1, user1);
                Message message2 = new Message("Message body example 2", new Date());
                Message message3 = new Message("Message body example 3", new Date());
                Message message4 = new Message("Message body example 4", new Date(), event2, user3);
                Message message5 = new Message("Message body example 5", new Date(), event3, user4);
                Message message6 = new Message("Message body example 6", new Date());
                Message message7 = new Message("Message body example 6", new Date(), event4, user4);

                // SAVE USERS
                userRepository.save(user1);
                userRepository.save(user2);
                userRepository.save(user3);
                userRepository.save(user4);
                userRepository.save(user5);

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

                // SAVE MESSAGES
                messageRepository.save(message1);
                messageRepository.save(message4);
                messageRepository.save(message5);
                messageRepository.save(message7);
                // messageRepository.save(message2);

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

                // SET THE USERS INTO THE EVENTS
                Set<Event> eventsToAsignUser1 = new HashSet<Event>(
                                Arrays.asList(event1, event2));
                user1.setEvents(eventsToAsignUser1);
                userRepository.save(user1);

                Set<Event> eventsToAsignUser2 = new HashSet<Event>(
                                Arrays.asList(event1, event3));
                user2.setEvents(eventsToAsignUser2);
                userRepository.save(user2);

                Set<Event> eventsToAsignUser3 = new HashSet<Event>(
                                Arrays.asList(event2, event4));
                user3.setEvents(eventsToAsignUser3);
                userRepository.save(user3);

                Set<Event> eventsToAsignUser4 = new HashSet<Event>(
                                Arrays.asList(event3, event4));
                user4.setEvents(eventsToAsignUser4);
                userRepository.save(user4);

                Set<Event> eventsToAsignUser5 = new HashSet<Event>(
                                Arrays.asList(event3, event4));
                user5.setEvents(eventsToAsignUser5);
                userRepository.save(user5);

                // SET THE ACHIEVEMENTS INTO THE USERS
                Set<Achievement> achievementsToAsignUser1 = new HashSet<Achievement>(
                                Arrays.asList(achievement1, achievement2, achievement3));
                user1.setAchievements(achievementsToAsignUser1);
                userRepository.save(user1);

                Set<Achievement> achievementsToAsignUser2 = new HashSet<Achievement>(
                                Arrays.asList(achievement1, achievement2));
                user2.setAchievements(achievementsToAsignUser2);
                userRepository.save(user2);

                Set<Achievement> achievementsToAsignUser3 = new HashSet<Achievement>(
                                Arrays.asList(achievement1, achievement3));
                user3.setAchievements(achievementsToAsignUser3);
                userRepository.save(user3);

                Set<Achievement> achievementsToAsignUser4 = new HashSet<Achievement>(
                                Arrays.asList(achievement2, achievement3));
                user4.setAchievements(achievementsToAsignUser4);
                userRepository.save(user4);

                /*
                 * MESSAGES
                 * 
                 * - The messages are not saved up like the rest of the entities.
                 * 
                 * 1. One way to save a message properly is to construct the message
                 * with the user and the event as parameters and then save the message.
                 * 
                 * Next we need to set the message into the user and the event, finally
                 * we save the message again with the messageRepository.
                 * (example: First example)
                 * 
                 * 2. The second way is to construct the message with only the body and
                 * the date as parameters and not saving it yet.
                 * 
                 * Next we need to set the message into the user and the event, then
                 * we set the user and the event to the message and finally we save the
                 * message with the messageRepository.
                 * (example: Second example)
                 * 
                 */

                // SET THE MESSAGES INTO THE USERS AND EVENTS
                // First example
                user1.setMessages(new HashSet<Message>(Arrays.asList(message1)));
                event1.setMessages(new HashSet<Message>(Arrays.asList(message1)));
                messageRepository.save(message1);

                user3.setMessages(new HashSet<Message>(Arrays.asList(message4)));
                event3.setMessages(new HashSet<Message>(Arrays.asList(message4)));
                messageRepository.save(message4);

                user4.setMessages(new HashSet<Message>(Arrays.asList(message5)));
                event4.setMessages(new HashSet<Message>(Arrays.asList(message5)));
                messageRepository.save(message5);

                user4.setMessages(new HashSet<Message>(Arrays.asList(message7)));
                event4.setMessages(new HashSet<Message>(Arrays.asList(message7)));
                messageRepository.save(message7);

                // Second example
                user2.setMessages(new HashSet<Message>(Arrays.asList(message2)));
                event2.setMessages(new HashSet<Message>(Arrays.asList(message2)));

                message2.setUser(user2);
                message2.setEvent(event2);
                messageRepository.save(message2);

                // Second example
                user5.setMessages(new HashSet<Message>(Arrays.asList(message3)));
                event4.setMessages(new HashSet<Message>(Arrays.asList(message3)));

                message3.setUser(user5);
                message3.setEvent(event4);
                messageRepository.save(message3);

                // Second example
                user5.setMessages(new HashSet<Message>(Arrays.asList(message6)));
                event4.setMessages(new HashSet<Message>(Arrays.asList(message6)));

                message6.setUser(user5);
                message6.setEvent(event4);
                messageRepository.save(message6);

                // FOLLOWERS
                user1.setFollowers(new HashSet<>(Arrays.asList(user2)));

                user1.getFollowing().add(user2);
                userRepository.save(user1);

                user2.setFollowers(new HashSet<>(Arrays.asList(user1, user3, user5)));

                user2.getFollowing().add(user1);
                user2.getFollowing().add(user3);
                user2.getFollowing().add(user5);
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

                user5.setFollowers(new HashSet<>(Arrays.asList(user2, user4)));

                System.out.println(user1.getFollowers());
                System.out.println("user2 => " + user2.getFollowers());
                System.out.println(user3.getFollowers());
                System.out.println(user4.getFollowers());
                System.out.println(user5.getFollowers());

                System.out.println("Database initialized");

        }

}
