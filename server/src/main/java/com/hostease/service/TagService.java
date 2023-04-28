package com.hostease.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hostease.entity.Tag;
import com.hostease.repository.TagRepository;

@Service
public class TagService {

    @Autowired
    TagRepository tagRepository;

    public List<Tag> findAll() {
        return tagRepository.findAll();
    }

    public Tag findById(Long id) {
        return tagRepository.findById(id).get();
    }

    public Tag save(Tag tag) {
        return tagRepository.save(tag);
    }

    public Tag update(Tag tag, Long id) {
        tagRepository.findById(id).ifPresent(tagToUpdate -> {
            tagToUpdate.setTag(tag.getTag());
            tagRepository.save(tagToUpdate);
        });
        return tagRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tag not found"));
    }

    public void deleteById(Long id) {
        tagRepository.deleteById(id);
    }

}
