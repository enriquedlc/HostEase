package com.hostease.controller;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hostease.entity.Event;
import com.hostease.enums.HttpStatusEnum;
import com.hostease.service.EventService;
import com.hostease.utils.ControllerJsonResponseMap;

@RestController
@RequestMapping("/hostease")
public class EventController {

    @Autowired
    EventService eventService;

    @GetMapping("/events")
    public ResponseEntity<Map<String, Object>> findAll() {

        List<Event> events = eventService.findAll();

        return new ControllerJsonResponseMap().jsonResponseMapListGenerator(
                events,
                HttpStatusEnum.STATUS_200_OK.getStatus(),
                "Events successfully retrieved",
                "Error retrieving events");
    }

    @GetMapping("/events/{id}")
    public ResponseEntity<Map<String, Object>> findById(@PathVariable("id") Long id) {

        Event event = eventService.findById(id);

        return new ControllerJsonResponseMap().jsonResponseMapObjectGenerator(
                event,
                HttpStatusEnum.STATUS_200_OK.getStatus(),
                "Event successfully retrieved",
                "Error retrieving event");
    }

    @PostMapping("/events{categoryId}")
    public ResponseEntity<Map<String, Object>> save(@RequestBody Event event, @RequestParam("categoryId") Long id) {

        Event eventToSave = eventService.save(event, id);

        return new ControllerJsonResponseMap().jsonResponseMapObjectGenerator(
                eventToSave,
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

    @DeleteMapping("events/{id}")
    public ResponseEntity<Map<String, Object>> delete(@PathVariable Long id) {
        Map<String, Object> jsonResponseMap = new LinkedHashMap<String, Object>();

        try {
            Event eventToDelete = eventService.findById(id);
            eventService.deleteById(id);

            jsonResponseMap.put("status", HttpStatusEnum.STATUS_200_OK.getStatus());
            jsonResponseMap.put("message", String.format("event %s deleted successfully", eventToDelete.getTitle()));

            return ResponseEntity.ok().body(jsonResponseMap);
        } catch (Exception e) {

            jsonResponseMap.put("status", HttpStatusEnum.STATUS_500_INTERNAL_SERVER_ERROR.getStatus());
            jsonResponseMap.put("message", "Error deleting event");
            jsonResponseMap.put("error", e.getMessage());
            jsonResponseMap.put("data", null);

            return ResponseEntity.ok().body(jsonResponseMap);
        }
    }

}
