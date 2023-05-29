package com.hostease.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hostease.dao.MessageDAO;
import com.hostease.entity.Event;
import com.hostease.entity.Message;
import com.hostease.entity.User;
import com.hostease.enums.HttpStatusEnum;
import com.hostease.service.EventService;
import com.hostease.service.MessageService;
import com.hostease.service.UserService;
import com.hostease.utils.ControllerJsonResponseMap;

@RestController
@RequestMapping("/hostease")
@CrossOrigin("*")
public class MessageController {

    @Autowired
    EventService eventService;

    @Autowired
    UserService userService;

    @Autowired
    MessageService messageService;

    @GetMapping("/messages")
    public ResponseEntity<Map<String, Object>> findAll() {

        List<Message> messages = messageService.findAll();

        return new ControllerJsonResponseMap().jsonResponseMapListGenerator(
                messages,
                HttpStatusEnum.STATUS_200_OK.getStatus(),
                "Messages successfully retrieved",
                "Error retrieving messages");

    }

    @GetMapping("/events/{eventId}/messages")
    public ResponseEntity<Map<String, Object>> findByEventId(@PathVariable("eventId") Long id) {

        List<Message> messages = messageService.findByEventId(id);

        return new ControllerJsonResponseMap().jsonResponseMapListGenerator(
                messages,
                HttpStatusEnum.STATUS_200_OK.getStatus(),
                "Messages successfully retrieved for event with id: " + id,
                "Error retrieving messages for event with id: " + id);

    }

    @PostMapping("/events/{eventId}/messages")
    public ResponseEntity<Map<String, Object>> saveMessage(
            @RequestBody MessageDAO messageContent,
            @RequestParam("userId") Long userId,
            @PathVariable("eventId") Long eventId) {

        Event event = eventService.findById(eventId);
        User user = userService.findById(userId);

        Message message = new Message();
        message.setMessage(messageContent.getMessage());
        message.setUser(user);
        message.setEvent(event);

        event.getMessages().add(message);
        user.getMessages().add(message);
        messageService.save(message);

        eventService.save(event, event.getCategory().getId());

        return new ControllerJsonResponseMap().jsonResponseMapObjectGenerator(
                event.getMessages(),
                HttpStatusEnum.STATUS_201_CREATED.getStatus(),
                "Message successfully created",
                "Error creating message");

    }

    @DeleteMapping("/message/{messageId}")
    public ResponseEntity<Map<String, Object>> deleteMessage(@PathVariable("messageId") Long id) {

        messageService.deleteById(id);

        return new ControllerJsonResponseMap().jsonResponseMapObjectGenerator(
                null,
                HttpStatusEnum.STATUS_200_OK.getStatus(),
                "Message successfully deleted",
                "Error deleting message");

    }

    @GetMapping("/message/{messageId}")
    public ResponseEntity<Map<String, Object>> findById(@PathVariable("messageId") Long id) {

        Message message = messageService.findById(id);

        return new ControllerJsonResponseMap().jsonResponseMapObjectGenerator(
                message,
                HttpStatusEnum.STATUS_200_OK.getStatus(),
                "Message successfully retrieved",
                "Error retrieving message");

    }


}
