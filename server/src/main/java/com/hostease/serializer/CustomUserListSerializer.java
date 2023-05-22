package com.hostease.serializer;

import java.io.IOException;
import java.util.Set;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.hostease.entity.User;

public class CustomUserListSerializer extends StdSerializer<Set<User>> {

    public CustomUserListSerializer() {
        this(null);
    }

    public CustomUserListSerializer(Class<Set<User>> t) {
        super(t);
    }

    @Override
    public void serialize(Set<User> users, JsonGenerator jsonGenerator, SerializerProvider serializerProvider)
            throws IOException {
        jsonGenerator.writeStartArray();
        for (User user : users) {
            jsonGenerator.writeStartObject();
            jsonGenerator.writeNumberField("userId", user.getId());
            jsonGenerator.writeStringField("userName", user.getNickname());
            jsonGenerator.writeStringField("userEmail", user.getEmail());
            jsonGenerator.writeEndObject();
        }
        jsonGenerator.writeEndArray();
    }
    
}
