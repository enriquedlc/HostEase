package com.hostease.controller;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hostease.entity.Event;
import com.hostease.enums.HttpStatusEnum;
import com.hostease.service.EventService;

@RestController
@RequestMapping("/hostease")
public class EventController {

    @Autowired
    EventService eventService;

    @GetMapping("/events")
    public ResponseEntity<Map<String, Object>> findAll() {
        Map<String, Object> response = new LinkedHashMap<String, Object>();

        try {
            List<Event> events = eventService.findAll();

            response.put("status", HttpStatusEnum.STATUS_200_OK.getStatus());
            response.put("message", "Events successfully retrieved");
            response.put("data", events);

            return ResponseEntity.status(200).body(response);
        } catch (Exception e) {
            response.put("status", HttpStatusEnum.STATUS_500_INTERNAL_SERVER_ERROR.getStatus());
            response.put("message", "Error retrieving events");
            response.put("error", e.getMessage());
            response.put("data", null);

            return ResponseEntity.status(500).body(response);
        }

    }

}
