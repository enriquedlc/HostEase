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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hostease.entity.User;
import com.hostease.enums.HttpStatusEnum;
import com.hostease.service.UserService;
import com.hostease.utils.ControllerJsonResponseMap;

@RestController
@RequestMapping("/hostease")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/users")
    public ResponseEntity<Map<String, Object>> findAll() {

        List<User> users = userService.findAll();

        return new ControllerJsonResponseMap().jsonResponseMapListGenerator(
                users,
                HttpStatusEnum.STATUS_200_OK.getStatus(),
                "Users successfully retrieved",
                "Error retrieving users");
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") Long id) {

        User user = userService.findById(id);

        return new ControllerJsonResponseMap().jsonResponseMapObjectGenerator(
                user,
                HttpStatusEnum.STATUS_200_OK.getStatus(),
                "User successfully retrieved",
                "Error retrieving user");
    }

    @PostMapping("/users")
    public ResponseEntity<?> save(@RequestBody User user) {

        User userToSave = userService.save(user);

        return new ControllerJsonResponseMap().jsonResponseMapObjectGenerator(
                userToSave,
                HttpStatusEnum.STATUS_201_CREATED.getStatus(),
                "User successfully created",
                "Error creating user");
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        Map<String, Object> jsonResponseMap = new LinkedHashMap<String, Object>();

        try {
            User userToDelete = userService.findById(id);
            userService.deleteById(id);

            jsonResponseMap.put("status", HttpStatusEnum.STATUS_200_OK.getStatus());
            jsonResponseMap.put("message", String.format("User %s successfully deleted", userToDelete.getName()));

            return ResponseEntity.status(200).body(jsonResponseMap);

        } catch (Exception e) {
            jsonResponseMap.put("status", HttpStatusEnum.STATUS_500_INTERNAL_SERVER_ERROR.getStatus());
            jsonResponseMap.put("message", "Error deleting user");
            jsonResponseMap.put("error", e.getMessage());
            jsonResponseMap.put("data", null);

            return ResponseEntity.status(500).body(jsonResponseMap);
        }
    }

}
