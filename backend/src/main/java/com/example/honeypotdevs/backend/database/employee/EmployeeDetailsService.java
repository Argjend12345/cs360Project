package com.example.honeypotdevs.backend.database.employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeDetailsService
{
    @Autowired
    private EmployeeRepository employeeRepository;
    public List<UserDetails> loadUsers()
    {
        List<Employee> employees = (List<Employee>) employeeRepository.findAll(); // Fetch all employees
        return employees.stream()
                .map(employee -> org.springframework.security.core.userdetails.User
                        .withUsername(employee.getUsername())
                        .password(employee.getPassword())
                        .roles(employee.getRole()) // Assuming a default role for all employees
                        .build())
                .collect(Collectors.toList());
    }
}
