package com.example.tictatinfy.tictatinfy.POJO;

import org.springframework.web.socket.WebSocketSession;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Transient;
import java.util.HashSet;

@Entity
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String sessionid;
    private String player1;
    private String player2;
    private int[][] grid;

    Session(String player1, String player2) {
        this.player1 = player1;
        this.player2 = player2;
    }

    Session() {

    }

    public int[][] updateGrid(int i, int j, int val) {
        if (this.grid[i][j] == -1) {
            this.grid[i][j] = val;
        }
        return grid;
    }

    public Long getId() {
        return this.id;
    }

    public int[][] getGrid() {
        return grid;
    }

    public void setGrid(int[][] grid) {
        this.grid = grid;
    }

    public String getPlayer1() {
        return player1;
    }

    public String getPlayer2() {
        return player2;
    }

    public void setPlayer2(String player2) {
        this.player2 = player2;
    }

    public String getSession_id() {
        return sessionid;
    }

    public String toString() {
        return player1 + " " + player2 + " " + sessionid + " ";
    }

    public void setSessionId(String ranSessionId) {
        this.sessionid = ranSessionId;
    }

}
