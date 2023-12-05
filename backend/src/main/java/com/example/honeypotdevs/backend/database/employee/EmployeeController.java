package com.example.honeypotdevs.backend.database.employee;

import com.example.honeypotdevs.backend.database.paystub.Paystub;
import com.example.honeypotdevs.backend.database.paystub.PaystubService;
import com.example.honeypotdevs.backend.database.shift.Shift;
import com.example.honeypotdevs.backend.database.shift.ShiftService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.atomic.AtomicLong;

@RestController
public class EmployeeController
{
    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private ShiftService shiftService;

    @Autowired
    private PaystubService paystubService;

    private AuthenticationManager authenticationManager;

    @RequestMapping("/employee")
    public List<Employee> getAllEmployee()
    {
        return employeeService.getAllEmployee();
    }

    @RequestMapping(method = RequestMethod.POST, value ="/employee")
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

    @RequestMapping(method = RequestMethod.GET, value = "/employee/{id}")
    public Optional<Employee> getEmployeeById(@PathVariable int id)
    {
        return employeeService.getEmployeeById(id);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/employee/{id}/edit")
    public void editEmployee(@RequestBody Employee employee, @PathVariable int id)
    {
        employeeService.editEmployee(employee, id);
    }

    //employee/{id}/paystubs/create

    @RequestMapping(method = RequestMethod.POST, value = "/employee/{id}/paystubs/create")
    public void createEmployeePaystub(@PathVariable int id)
    {
        Optional<Employee> e = employeeService.getEmployeeById(id);//Getting the employee by passed id

        Set<Shift> employeeShifts = e.get().getShifts();//Getting all the employee shifts

        //Calculating the employee's total hours and minutes.
        AtomicLong hoursDiff = new AtomicLong();
        AtomicLong minutesDiff = new AtomicLong();

        employeeShifts.forEach(shift -> {
            hoursDiff.addAndGet(shift.getClockIn().until(shift.getClockOut(), ChronoUnit.HOURS));
            minutesDiff.addAndGet(shift.getClockIn().until(shift.getClockOut(), ChronoUnit.MINUTES) % 60);
        });

        //Get day & to string
        double totalMinutes = (hoursDiff.get() * 60) + minutesDiff.get();
        double payRate = e.get().getHourlyPay();
        double grossPay = (totalMinutes/60) * payRate;
        double hoursWorked = hoursDiff.get();
        double netPay = grossPay * 0.80;
        boolean paid = false;

        LocalDate currentDate = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy");
        String date = currentDate.format(formatter);

        Paystub p = new Paystub(e.get(), date, hoursWorked,grossPay, netPay, paid);

        e.ifPresent(p::setEmployee);
        paystubService.addPaystub(p);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/employee/{id}/paystubs")
    public List<Paystub> getAllEmployeePaystubs(@PathVariable int id)
    {
        return paystubService.getEmployeePaystubs(id);
    }

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
