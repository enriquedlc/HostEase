package com.hostease.deserializer;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import com.hostease.entity.Message;

public class CustomMessageDeserializer extends StdDeserializer<Message> {

    public CustomMessageDeserializer() {
        this(null);
    }

    public CustomMessageDeserializer(Class<Message> t) {
        super(t);
    }

    @Override
    public Message deserialize(
            JsonParser jsonParser,
            DeserializationContext deserializationContext) throws IOException, JsonProcessingException {

        ObjectMapper mapper = (ObjectMapper) jsonParser.getCodec();
        JsonNode rootNode = mapper.readTree(jsonParser);

        // Extract the fields from the JSON node
        String message = rootNode.get("message").asText();
        String publishedAt = rootNode.get("publishedAt").asText();

        Message messageBody = new Message();

        messageBody.setMessage(message);
        messageBody.setPublishedAt(publishedAt);

        return messageBody;

    }
}
