package com.hostease.dao;

public class MessageDAO {

    private String message;

    public MessageDAO() {

    }

    public MessageDAO(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
