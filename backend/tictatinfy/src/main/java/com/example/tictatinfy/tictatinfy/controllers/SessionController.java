package com.example.tictatinfy.tictatinfy.controllers;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.tictatinfy.tictatinfy.POJO.Session;
import com.example.tictatinfy.tictatinfy.services.SessionService;

@RestController
public class SessionController {

    @Autowired
    private SessionService service;

    @GetMapping(path = "/test")
    public String helloWorld() {
        return "Hello World";
    }

    @PostMapping(path = "/create")
    public ResponseEntity<String> createSession(@RequestBody Session session) {
        return ResponseEntity.ok(service.createSession(session));
    }

    @GetMapping(path = "/test2")
    public ResponseEntity<List<Session>> getAllSessionTesting() {
        return ResponseEntity.ok(service.getAllSessions());
    }

    @GetMapping(path = "/getSession/{id}")
    public ResponseEntity<List<Session>> getSessionByID(@PathVariable String id) {
        return ResponseEntity.ok(service.getSession(id));
    }

    @DeleteMapping(path = "/del/{id}")
    public ResponseEntity<Boolean> deleteUser(@PathVariable String id) {
        boolean flag = service.deleteSession(id);
        return ResponseEntity.ok(flag);
    }

    @PutMapping(path = "/{id}/{i}/{j}/{val}")
    public ResponseEntity<List<Session>> updateGridByID(@PathVariable String id, @PathVariable String i,
            @PathVariable String j, @PathVariable String val) {
        return ResponseEntity.ok(service.updateGrid(id, Integer.valueOf(i), Integer.valueOf(j), Integer.valueOf(val)));
    }

}
