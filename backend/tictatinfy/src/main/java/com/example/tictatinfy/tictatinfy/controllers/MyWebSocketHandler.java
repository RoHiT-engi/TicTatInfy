package com.example.tictatinfy.tictatinfy.controllers;

import java.net.URI;

import org.hibernate.mapping.Array;
// import org.hibernate.mapping.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import java.util.*;
// import org.springframework.web.bind.annotation.RestController;

import com.example.tictatinfy.tictatinfy.POJO.Session;
import com.example.tictatinfy.tictatinfy.services.SessionService;

@Component
@CrossOrigin(origins = "http://localhost:5500")
public class MyWebSocketHandler extends TextWebSocketHandler {

    private final Map<String, HashSet<WebSocketSession>> sessionMap = new HashMap<>();

    @Autowired
    private SessionService service;

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String clientMessage = message.getPayload();
        String sessionID = session.getUri().getQuery().split("=")[1];
        if (session.getUri().getQuery().split("=")[0].equals("id") && service.checkValidSession(sessionID)) {
            System.out.println("valid sessiion " + clientMessage);
            String[] str = clientMessage.split("/");
            int i = Integer.parseInt(str[0]);
            int j = Integer.parseInt(str[1]);
            int val = Integer.parseInt(str[2]);
            Session updated = service.updateGrid(sessionID, i, j, val).get(0);
            HashSet<WebSocketSession> hash = sessionMap.get(sessionID);
            for (WebSocketSession z : hash) {
                z.sendMessage(new TextMessage(Arrays.deepToString(updated.getGrid())));
            }
        } else {
            System.out.println("Invalid Session Request :  " + sessionID);
        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println(session);
        String[] str = session.getUri().getQuery().split("=");
        System.out.println(Arrays.toString(str));
        if (str[0].equals("id") && service.checkValidSession(str[1])) {
            if (!sessionMap.containsKey(str[1])) {
                sessionMap.put(str[1], new HashSet<>());
            }
            sessionMap.get(str[1]).add(session);
        }
        System.err.println("In conn estableis");
        System.out.println(session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        System.out.println("Connection closed: " + session.getId() + " " + status + " " + session.getUri());
        String sessionID = session.getUri().getQuery().split("=")[1];
        if (session.getUri().getQuery().split("=")[0].equals("id") && service.checkValidSession(sessionID)
                && sessionMap.containsKey(sessionID)) {
            if (sessionMap.get(sessionID).isEmpty()) {
                sessionMap.remove(sessionID);
            }
            for (WebSocketSession i : sessionMap.get(sessionID)) {
                if (i.equals(session)) {
                    sessionMap.get(sessionID).remove(i);
                }
            }
        }
    }
}
