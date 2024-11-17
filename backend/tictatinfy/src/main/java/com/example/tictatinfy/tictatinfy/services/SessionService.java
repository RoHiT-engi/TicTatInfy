package com.example.tictatinfy.tictatinfy.services;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.tictatinfy.tictatinfy.POJO.Session;
import com.example.tictatinfy.tictatinfy.repo.SessionRepository;

@Component
public class SessionService {

    @Autowired
    private SessionRepository repo;

    public String getSaltString() {
        String SALTCHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        StringBuilder salt = new StringBuilder();
        Random rnd = new Random();
        while (salt.length() < 6) { // length of the random string.
            int index = (int) (rnd.nextFloat() * SALTCHARS.length());
            salt.append(SALTCHARS.charAt(index));
        }
        String saltStr = salt.toString();
        return saltStr;
    }

    public boolean checkValidSession(String Session_id) {
        List<Session> ls = repo.findBySessionid(Session_id);
        return ls.size() > 0 ? true : false;
    }
    
    public List<Session> getSession(String Session_id) {
        List<Session> ls = repo.findBySessionid(Session_id);
        return ls;
    }


    public String createSession(Session session) {
        String ranSessionId = this.getSaltString();
        while (this.checkValidSession(ranSessionId)) {
            ranSessionId = this.getSaltString();
        }
        session.setSessionId(ranSessionId);
        int[][] grid = new int[3][3];
        for (int[] i : grid){
            Arrays.fill(i, -1);
        }
        session.setGrid(grid);
        session.setLastPlayed("-1");
        repo.save(session);
        return ranSessionId;
    }

    public List<Session> getAllSessions() {
        List<Session> allCustomer = new ArrayList<>();
        repo.findAll().forEach(allCustomer::add);
        return allCustomer;
    }

    public boolean deleteSession(String Session_id) {
        List<Session> ls = this.getSession(Session_id);
        for (Session i : ls) {
            repo.deleteById(i.getId());
        }
        return !this.checkValidSession(Session_id);
    }

    public List<Session> updateGrid(String Session_id, int i, int j,int val) {
        List<Session> allCustomer = this.getSession(Session_id);
        for (Session temp : allCustomer) {
            temp.updateGrid(i, j, val);
            temp.setLastPlayed(val+"");
            repo.save(temp);
        }
        return allCustomer;
    }

    public List<Session> createSessionP2(String Session_id, String p2) {
        List<Session> ls = this.getSession(Session_id);
        for (Session i : ls) {
            i.setPlayer2(p2);
            repo.save(i);
        }
        return ls;
    }

    public String getLastPlayedPlayer(String Session_id) {
        List<Session> ls = repo.findBySessionid(Session_id);
        return ls.get(0).getLastPlayed();
    } 
}
