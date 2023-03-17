package com.hostease.runner;

import org.springframework.boot.CommandLineRunner;

public class initDatabase implements CommandLineRunner {
    
    @Override
    public void run(String... args) throws Exception {
        System.out.println("initializing Database...");
    }

}
