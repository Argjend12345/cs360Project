package com.example.honeypotdevs.backend.database.employee;

import com.example.honeypotdevs.backend.database.shift.Shift;
import com.example.honeypotdevs.backend.database.shift.ShiftService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class EmployeeController
{
    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private ShiftService shiftService;

    private AuthenticationManager authenticationManager;

    @RequestMapping("/employee")
    public List<Employee> getAllEmployee()
    {
        return employeeService.getAllEmployee();
    }

    @RequestMapping(method = RequestMethod.POST, value ="/employees")
    public int addClient(@RequestBody Employee employee)
    {
        System.out.println("You added a new client.");
        employeeService.addEmployee(employee);

        for(int i = 1; i < 8; i++)
        {
            shiftService.addShift(new Shift(employee));
        }

        return 5;
    }

    //We could just call get employee, and splice the data from the json.


    //Would be nice)
        //I want an endpoint to get an employee's shifts. All of them.
        //I want an endpoint to get an employee's specific shift data.

    //Post request with shift object,



    @RequestMapping(method = RequestMethod.POST, value = "/employee/{id}/shifts/update")
    public void updateEmployeeShift(@RequestBody Shift s, @PathVariable int id)
    {
        //Get employee object using the employee Id.
        Optional<Employee> e = employeeService.getEmployeeById(id);//Getting the employee by passed id
        e.ifPresent(s::setEmployee);

        shiftService.addShift(s);
    }
    @RequestMapping(method = RequestMethod.GET, value ="/employee/{id}/shifts")
    public List<Shift> getAllEmployeeShifts(@PathVariable int id)
    {
        return shiftService.getEmployeeShifts(id);
    }

}
