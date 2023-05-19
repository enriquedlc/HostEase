package com.hostease.models;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class Location {

    @Column(name = "location_lat", nullable = false)
    private Double lat;

    @Column(name = "location_lng", nullable = false)
    private Double lng;

    public Location() {
    }

    public Location(Double lat, Double lng) {
        this.lat = lat;
        this.lng = lng;
    }

    public Double getLat() {
        return lat;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }

    public Double getLng() {
        return lng;
    }

    public void setLng(Double lng) {
        this.lng = lng;
    }

    @Override
    public String toString() {
        return "Location [lat=" + lat + ", lng=" + lng + "]";
    }
}
