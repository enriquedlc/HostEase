package com.hostease.serializer;

import java.io.IOException;
import java.util.Set;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.hostease.entity.Like;

public class CustomCountLikeSerializer extends StdSerializer<Set<Like>> {

    public CustomCountLikeSerializer() {
        this(null);
    }

    public CustomCountLikeSerializer(Class<Set<Like>> t) {
        super(t);
    }

    @Override
    public void serialize(Set<Like> likes, JsonGenerator jsonGenerator, SerializerProvider serializerProvider)
            throws IOException {
        jsonGenerator.writeNumber(likes.size());
    }

}