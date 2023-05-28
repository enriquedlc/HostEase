package com.hostease.enums;

public enum JsonResponseMessageEnum {

    SUCCESSFULLY_RETRIEVED_DATA("Successfully retrieved data"),
    SUCCESSFULLY_SAVED_DATA("Successfully saved data"),
    SUCCESSFULLY_UPDATED_DATA("Successfully updated data"),
    SUCCESSFULLY_DELETED_DATA("Successfully deleted data"),
    ERROR_RETRIEVING_DATA("Error retrieving data"),
    ERROR_SAVING_DATA("Error saving data"),
    ERROR_UPDATING_DATA("Error updating data"),
    ERROR_DELETING_DATA("Error deleting data");

    public String message;

    JsonResponseMessageEnum(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

}
