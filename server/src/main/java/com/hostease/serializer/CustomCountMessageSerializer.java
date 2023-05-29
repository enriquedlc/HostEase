package com.hostease.serializer;

import java.io.IOException;
import java.util.Set;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.hostease.entity.Message;

public class CustomCountMessageSerializer extends StdSerializer<Set<Message>> {

    public CustomCountMessageSerializer() {
        this(null);
    }

    public CustomCountMessageSerializer(Class<Set<Message>> t) {
        super(t);
    }

    @Override
    public void serialize(Set<Message> messages, JsonGenerator jsonGenerator, SerializerProvider serializerProvider)
            throws IOException {
        jsonGenerator.writeNumber(messages.size());
    }

}
