package com.hostease.serializer;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.hostease.entity.User;

public class CustomEventOwnerSerializer extends StdSerializer<User> {

    public CustomEventOwnerSerializer() {
        this(null);
    }

    public CustomEventOwnerSerializer(Class<User> t) {
        super(t);
    }

    @Override
    public void serialize(User user, JsonGenerator jsonGenerator, SerializerProvider serializerProvider)
            throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeNumberField("id", user.getId());
        jsonGenerator.writeStringField("nickname", user.getNickname());
        jsonGenerator.writeStringField("email", user.getEmail());
        jsonGenerator.writeStringField("phone", user.getPhone());
        jsonGenerator.writeNumberField("followers", user.getFollowers().size());
        jsonGenerator.writeEndObject();
    }
}
