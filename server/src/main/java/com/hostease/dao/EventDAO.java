package com.hostease.dao;

import com.hostease.entity.Event;

public class EventDAO {

    private Event event;
    private boolean liked;
    private boolean joined;
    
    public EventDAO() {

    }
    
    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public boolean isLiked() {
        return liked;
    }

    public void setLiked(boolean liked) {
        this.liked = liked;
    }

    public boolean isJoined() {
        return joined;
    }

    public void setJoined(boolean joined) {
        this.joined = joined;
    }




}
