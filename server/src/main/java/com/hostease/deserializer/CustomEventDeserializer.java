package com.hostease.deserializer;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import com.hostease.entity.Event;
import com.hostease.entity.Tag;
import com.hostease.models.Location;

public class CustomEventDeserializer extends StdDeserializer<Event> {

    public CustomEventDeserializer() {
        this(null);
    }

    public CustomEventDeserializer(Class<Event> t) {
        super(t);
    }

    @Override
    public Event deserialize(JsonParser jsonParser, DeserializationContext deserializationContext)
            throws IOException, JsonProcessingException {
        ObjectMapper mapper = (ObjectMapper) jsonParser.getCodec();
        JsonNode rootNode = mapper.readTree(jsonParser);

        // Extract the fields from the JSON node
        String title = rootNode.get("title").asText();
        String description = rootNode.get("description").asText();
        String startDate = rootNode.get("startDate").asText();
        String endDate = rootNode.get("endDate").asText();
        String startTime = rootNode.get("startTime").asText();
        String endTime = rootNode.get("endTime").asText();
        Long maxCapacity = rootNode.get("maxCapacity").asLong();
        Double photo = rootNode.get("photo").asDouble();
        Location location = rootNode.get("location").traverse(mapper).readValueAs(Location.class);

        Event event = new Event();

        JsonNode tagsNode = rootNode.get("tags");

        if (tagsNode != null && tagsNode.isArray()) {
            Set<Tag> tags = new HashSet<>();
            for (JsonNode tagElement : tagsNode) {
                // Extract the fields from the 'tagNode'
                Long tagId = tagElement.get("id").asLong();
                String tagName = tagElement.get("tag").asText();
                String tagColor = tagElement.get("color").asText();

                // Create a new Tag instance and set the extracted fields
                Tag tag = new Tag();
                tag.setId(tagId);
                tag.setTag(tagName);
                tag.setColor(tagColor);
                // ...

                // Add the Tag instance to the 'tags' collection
                tags.add(tag);

            }
            event.setTags(tags);
        }

        event.setTitle(title);
        event.setDescription(description);
        event.setStartDate(startDate);
        event.setEndDate(endDate);
        event.setStartTime(startTime);
        event.setEndTime(endTime);
        event.setMaxCapacity(maxCapacity);
        event.setPhoto(photo);
        event.setLocation(location);
        // event.setTags(tags);

        // Return the created Event instance
        return event;
    }

}
