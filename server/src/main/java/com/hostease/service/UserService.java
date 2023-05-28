package com.hostease.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hostease.entity.User;
import com.hostease.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findById(Long id) {
        return userRepository.findById(id).get();
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    public User update(User user) {
        userRepository.findById(user.getId()).ifPresent(userToUpdate -> {
            userToUpdate.setNickname(user.getNickname());
            userToUpdate.setPhone(user.getPhone());
            userToUpdate.setEmail(user.getEmail());
            userToUpdate.setPassword(user.getPassword());
            userRepository.save(userToUpdate);
        });
        return userRepository.findById(user.getId()).get();
    }

    public boolean followUser(Long followedUserId, Long followerUserId) {
        User followedUser = userRepository.findById(followedUserId).get();
        User followerUser = userRepository.findById(followerUserId).get();
        if (followedUser.getFollowers().contains(followerUser)) {
            followedUser.getFollowers().remove(followerUser);
            userRepository.save(followedUser);
            userRepository.save(followerUser);
            return false;
        } else {
            followedUser.getFollowers().add(followerUser);
            userRepository.save(followedUser);
            userRepository.save(followerUser);
            return true;
        }
    }

    public List<User> findFollowersByUserId(Long id) {
        return userRepository.findFollowersById(id);
    }

}
