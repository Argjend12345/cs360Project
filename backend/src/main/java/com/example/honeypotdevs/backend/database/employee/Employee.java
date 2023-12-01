package com.example.honeypotdevs.backend.database.employee;

import com.example.honeypotdevs.backend.security.AES256Encryption;
import com.example.honeypotdevs.backend.security.SHA256Hashing;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
@Entity
public class Employee
{
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int employeeId;
    private String name;

    private String address;

    private String username;

    private String password;

    private String role;

    public Employee(String name, String address, String username, String password, String role)
    {
        this.name = name;
        this.address = address;
        this.username = username;
        setPassword(password);
        this.role = role;
    }

    public Employee() {

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        String hashedPass = SHA256Hashing.hash(password); // Hash the password
        this.password = AES256Encryption.encrypt(hashedPass); // Encrypt the hashed password & store to db.
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
