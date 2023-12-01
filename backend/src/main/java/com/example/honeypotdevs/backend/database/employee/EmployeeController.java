package com.example.honeypotdevs.backend.database.employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class EmployeeController
{
    @Autowired
    private EmployeeService employeeService;
    private AuthenticationManager authenticationManager;

    @RequestMapping("/employee")
    public List<Employee> getAllEmployee()
    {
        return employeeService.getAllEmployee();
    }

    @RequestMapping(method = RequestMethod.POST, value ="/employees")
    public int addClient(@RequestBody Employee employee)
    {
        employeeService.addEmployee(employee);
        return 5;
    }
}
