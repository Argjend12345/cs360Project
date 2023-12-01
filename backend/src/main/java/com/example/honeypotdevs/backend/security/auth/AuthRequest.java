package com.example.honeypotdevs.backend.security.auth;

public class AuthRequest {
    private String user;
    private String pass;

    public AuthRequest() {
    }

    public AuthRequest(String user, String pass) {
        this.user = user;
        this.pass = pass;
    }

    // Getters and setters
    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }
}

