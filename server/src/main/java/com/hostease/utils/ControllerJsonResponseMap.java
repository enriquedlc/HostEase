package com.hostease.utils;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.hostease.enums.HttpStatusEnum;

public class ControllerJsonResponseMap {

    public ResponseEntity<Map<String, Object>> jsonResponseMapListGenerator(
            List<?> data,
            String httpStatus,
            String successMessage,
            String errorMessage) {

        Map<String, Object> jsonResponseMap = new LinkedHashMap<String, Object>();

        try {
            jsonResponseMap.put("status", httpStatus);
            jsonResponseMap.put("message", successMessage);
            jsonResponseMap.put("data", data);

            return ResponseEntity.status(200).body(jsonResponseMap);

        } catch (Exception e) {
            jsonResponseMap.put("status", HttpStatusEnum.STATUS_500_INTERNAL_SERVER_ERROR.getStatus());
            jsonResponseMap.put("message", errorMessage);
            jsonResponseMap.put("error", e.getMessage());
            jsonResponseMap.put("data", null);

            return ResponseEntity.status(500).body(jsonResponseMap);
        }
    }

    public ResponseEntity<Map<String, Object>> jsonResponseMapObjectGenerator(
            Object data,
            String httpStatus,
            String successMessage,
            String errorMessage) {

        Map<String, Object> jsonResponseMap = new LinkedHashMap<String, Object>();

        try {
            jsonResponseMap.put("status", httpStatus);
            jsonResponseMap.put("message", successMessage);
            jsonResponseMap.put("data", data);

            return ResponseEntity.status(200).body(jsonResponseMap);

        } catch (Exception e) {
            jsonResponseMap.put("status", HttpStatusEnum.STATUS_500_INTERNAL_SERVER_ERROR.getStatus());
            jsonResponseMap.put("message", errorMessage);
            jsonResponseMap.put("error", e.getMessage());
            jsonResponseMap.put("data", null);

            return ResponseEntity.status(500).body(jsonResponseMap);
        }
    }

}
