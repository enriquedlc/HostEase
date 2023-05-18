package com.hostease.enums;

public enum HttpStatusEnum {

    STATUS_200_OK("200 OK"),
    STATUS_201_CREATED("201 Created"),
    STATUS_204_NO_CONTENT("204 No Content"),
    STATUS_400_BAD_REQUEST("400 Bad Request"),
    STATUS_401_UNAUTHORIZED("401 Unauthorized"),
    STATUS_409_CONFLICT("409 Conflict"),
    STATUS_500_INTERNAL_SERVER_ERROR("500 Internal Server Error");

    private final String status;

    HttpStatusEnum(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }
}
