package com.hostease.serializer;

import java.io.IOException;
import java.util.Set;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.hostease.entity.User;

public class CustomCountUserSerializer extends StdSerializer<Set<User>> {

    public CustomCountUserSerializer() {
        this(null);
    }

    public CustomCountUserSerializer(Class<Set<User>> t) {
        super(t);
    }

    @Override
    public void serialize(Set<User> users, JsonGenerator jsonGenerator, SerializerProvider serializerProvider)
            throws IOException {
        jsonGenerator.writeNumber(users.size());
    }

}
