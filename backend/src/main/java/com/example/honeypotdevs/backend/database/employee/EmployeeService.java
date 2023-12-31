package com.example.honeypotdevs.backend.database.employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Employee> getAllEmployee()
    {
        List<Employee> e = new ArrayList<>();
        employeeRepository.findAll().forEach(e::add);
        return e;
    }

    public Optional<Employee> getEmployeeById(int id)
    {
        return employeeRepository.findById(id);
    }

    public Optional<Optional<Employee>> findByUsername(String username)
    {
        return Optional.ofNullable(employeeRepository.findByUsername(username));
    }
    public void addEmployee(Employee employee)
    {
        employeeRepository.save(employee);
    }

    public void editEmployee(Employee employee, int id)
    {
        Employee e = employeeRepository.findById(id).stream().findFirst().get();

        e.setName(employee.getName());
        e.setRole(employee.getRole());
        e.setShifts(employee.getShifts());
        e.setHourlyPay(employee.getHourlyPay());
        e.setUsername(employee.getUsername());
        e.setPassword(employee.getPassword());

        employeeRepository.save(e);
    }
    public void removeEmployee(int id)
    {
        employeeRepository.deleteById(id);
    }

    public void updateEmployee(Employee employee)
    {
        employeeRepository.save(employee);
    }

}
