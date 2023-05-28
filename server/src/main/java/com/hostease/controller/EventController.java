package com.hostease.controller;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hostease.dao.EventDAO;
import com.hostease.entity.Event;
import com.hostease.entity.User;
import com.hostease.enums.HttpStatusEnum;
import com.hostease.service.CategoryService;
import com.hostease.service.EventService;
import com.hostease.service.MessageService;
import com.hostease.service.TagService;
import com.hostease.service.UserService;
import com.hostease.utils.ControllerJsonResponseMap;

@RestController
@RequestMapping("/hostease")
@CrossOrigin("*")
public class EventController {

    @Autowired
    EventService eventService;

    @Autowired
    CategoryService categoryService;

    @Autowired
    TagService tagService;

    @Autowired
    UserService userService;

    @Autowired
    MessageService messageService;

    @GetMapping("/user/{userId}/events")
    public ResponseEntity<Map<String, Object>> findByUserId(@PathVariable("userId") Long id) {

        List<Event> events = eventService.findByUserId(id);

        return new ControllerJsonResponseMap().jsonResponseMapListGenerator(
                events,
                HttpStatusEnum.STATUS_200_OK.getStatus(),
                "Events successfully retrieved for user with id: " + id,
                "Error retrieving events");
    }

    @GetMapping("/events")
    public ResponseEntity<Map<String, Object>> findAll() {

        List<Event> events = eventService.findAll();

        return new ControllerJsonResponseMap().jsonResponseMapListGenerator(
                events,
                HttpStatusEnum.STATUS_200_OK.getStatus(),
                "Event successfully retrieved",
                "Error retrieving event");
    }

    @GetMapping("/event/{eventId}")
    public ResponseEntity<Map<String, Object>> findById(@PathVariable("eventId") Long eventId,
            @RequestParam("userId") Long userId) {

        User user = userService.findById(userId);
        Event event = eventService.findById(eventId);

        boolean hasLikedEvent = user.getLikes().stream()
                .anyMatch(onLike -> onLike.getEvent().getId().equals(eventId));

        boolean isUserInEvent = event.getUsers().stream()
                .anyMatch(onUser -> onUser.getId().equals(userId));

        EventDAO eventDAO = new EventDAO();

        eventDAO.setEvent(event);
        eventDAO.setLiked(hasLikedEvent);
        eventDAO.setJoined(isUserInEvent);

        return new ControllerJsonResponseMap().jsonResponseMapObjectGenerator(
                eventDAO,
                HttpStatusEnum.STATUS_200_OK.getStatus(),
                "Event successfully retrieved",
                "Error retrieving event");
    }

    @PostMapping("/event/{categoryId}")
    public ResponseEntity<Map<String, Object>> save(@RequestBody Event event,
            @PathVariable("categoryId") Long categoryId, @RequestParam("owner") Long ownerId) {

        Event output = eventService.save(event, categoryId, ownerId);

        return new ControllerJsonResponseMap().jsonResponseMapObjectGenerator(
                output != null ? true : false,
                HttpStatusEnum.STATUS_201_CREATED.getStatus(),
                "Event successfully created",
                "Error creating event");

    }

    @PutMapping("/events/{id}")
    public ResponseEntity<Map<String, Object>> update(@RequestBody Event event, @PathVariable Long id) {

        Event eventToUpdate = eventService.update(event, id);

        return new ControllerJsonResponseMap().jsonResponseMapObjectGenerator(
                eventToUpdate,
                HttpStatusEnum.STATUS_200_OK.getStatus(),
                "Event successfully updated",
                "Error updating event");
    }

    @DeleteMapping("event/{id}")
    public ResponseEntity<Map<String, Object>> delete(@PathVariable Long id) {
        Map<String, Object> jsonResponseMap = new LinkedHashMap<String, Object>();

        try {
            Event eventToDelete = eventService.findById(id);

            eventToDelete.getTags().clear();
            eventToDelete.getUsers().clear();
            eventToDelete.setTags(null);
            eventToDelete.setUsers(null);

            eventService.deleteById(id);

            jsonResponseMap.put("status", HttpStatusEnum.STATUS_200_OK.getStatus());
            jsonResponseMap.put("message", String.format("event %s deleted successfully", eventToDelete.getTitle()));
            jsonResponseMap.put("data", true);

            return ResponseEntity.ok().body(jsonResponseMap);

        } catch (Exception e) {

            jsonResponseMap.put("status", HttpStatusEnum.STATUS_500_INTERNAL_SERVER_ERROR.getStatus());
            jsonResponseMap.put("message", "Error deleting event");
            jsonResponseMap.put("error", e.getMessage());
            jsonResponseMap.put("data", false);

            return ResponseEntity.ok().body(jsonResponseMap);
        }
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<Map<String, Object>> manageUserOnEvent(@PathVariable("userId") Long userId,
            @RequestParam("eventId") Long eventId) {

        boolean result = eventService.manageUserOnEvent(eventId, userId);

        return new ControllerJsonResponseMap().jsonResponseMapObjectGenerator(
                result,
                HttpStatusEnum.STATUS_200_OK.getStatus(),
                "User successfully " + (result ? "added to" : "removed from") + " event",
                "Error adding user to event");
    }
}
