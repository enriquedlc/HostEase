package com.hostease.controller;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
        Map<String, Object> jsonResponseMap = new LinkedHashMap<String, Object>();

        try {
            List<Event> events = eventService.findAll();

            jsonResponseMap.put("status", HttpStatusEnum.STATUS_200_OK.getStatus());
            jsonResponseMap.put("message", "Events successfully retrieved");
            jsonResponseMap.put("data", events);

            return ResponseEntity.status(200).body(jsonResponseMap);
        } catch (Exception e) {
            jsonResponseMap.put("status", HttpStatusEnum.STATUS_500_INTERNAL_SERVER_ERROR.getStatus());
            jsonResponseMap.put("message", "Error retrieving events");
            jsonResponseMap.put("error", e.getMessage());
            jsonResponseMap.put("data", null);

            return ResponseEntity.status(500).body(jsonResponseMap);
        }

    }

    @GetMapping("/events/{id}")
    public ResponseEntity<Map<String, Object>> findById(@PathVariable("id") Long id) {
        Map<String, Object> jsonResponseMap = new LinkedHashMap<String, Object>();

        try {
            Event event = eventService.findById(id);

            jsonResponseMap.put("status", HttpStatusEnum.STATUS_200_OK.getStatus());
            jsonResponseMap.put("message", "Event successfully retrieved");
            jsonResponseMap.put("data", event);

            return ResponseEntity.status(200).body(jsonResponseMap);
        } catch (Exception e) {
            jsonResponseMap.put("status", HttpStatusEnum.STATUS_500_INTERNAL_SERVER_ERROR.getStatus());
            jsonResponseMap.put("message", "Error retrieving event");
            jsonResponseMap.put("error", e.getMessage());
            jsonResponseMap.put("data", null);

            return ResponseEntity.status(500).body(jsonResponseMap);
        }

    }


}
