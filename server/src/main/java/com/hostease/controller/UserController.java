package com.hostease.controller;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hostease.entity.User;
import com.hostease.enums.HttpStatusEnum;
import com.hostease.service.UserService;

@RestController
@RequestMapping("/hostease")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/users")
    public ResponseEntity<?> findAll() {
        Map<String, Object> jsonResponseMap = new LinkedHashMap<String, Object>();

        try {
            List<User> users = userService.findAll();

            jsonResponseMap.put("status", HttpStatusEnum.STATUS_200_OK.getStatus());
            jsonResponseMap.put("message", "Users successfully retrieved");
            jsonResponseMap.put("data", users);

            return ResponseEntity.status(200).body(jsonResponseMap);

        } catch (Exception e) {
            jsonResponseMap.put("status", HttpStatusEnum.STATUS_500_INTERNAL_SERVER_ERROR.getStatus());
            jsonResponseMap.put("message", "Error retrieving users");
            jsonResponseMap.put("error", e.getMessage());
            jsonResponseMap.put("data", null);

            return ResponseEntity.status(500).body(jsonResponseMap);
        }
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Long id) {
        Map<String, Object> jsonResponseMap = new LinkedHashMap<String, Object>();

        try {
            User user = userService.findById(id);

            jsonResponseMap.put("status", HttpStatusEnum.STATUS_200_OK.getStatus());
            jsonResponseMap.put("message", "User successfully retrieved");
            jsonResponseMap.put("data", user);

            return ResponseEntity.status(200).body(jsonResponseMap);

        } catch (Exception e) {
            jsonResponseMap.put("status", HttpStatusEnum.STATUS_500_INTERNAL_SERVER_ERROR.getStatus());
            jsonResponseMap.put("message", "Error retrieving user");
            jsonResponseMap.put("error", e.getMessage());
            jsonResponseMap.put("data", null);

            return ResponseEntity.status(500).body(jsonResponseMap);
        }
    }

    @PostMapping("/users")
    public ResponseEntity<?> save(@RequestBody User user) {
        Map<String, Object> jsonResponseMap = new LinkedHashMap<String, Object>();

        try {
            User savedUser = userService.save(user);

            jsonResponseMap.put("status", HttpStatusEnum.STATUS_201_CREATED.getStatus());
            jsonResponseMap.put("message", "User successfully saved");
            jsonResponseMap.put("data", savedUser);

            return ResponseEntity.status(200).body(jsonResponseMap);

        } catch (Exception e) {
            jsonResponseMap.put("status", HttpStatusEnum.STATUS_500_INTERNAL_SERVER_ERROR.getStatus());
            jsonResponseMap.put("message", "Error saving user");
            jsonResponseMap.put("error", e.getMessage());
            jsonResponseMap.put("data", null);

            return ResponseEntity.status(500).body(jsonResponseMap);
        }
    }

}
