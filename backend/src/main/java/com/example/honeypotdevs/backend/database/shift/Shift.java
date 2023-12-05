package com.example.honeypotdevs.backend.database.shift;

import com.example.honeypotdevs.backend.database.employee.Employee;
import jakarta.persistence.*;

@Entity
public class Shift
{
    @ManyToOne
    @JoinColumn(name="employee_id", nullable=false)
    private Employee employee;

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    private double clockIn;

    private double clockOut;

    private boolean isScheduled;


    public Shift(Employee e)
    {
        this.employee = e;
        this.clockIn = 0;
        this.clockOut = 0;
        this.isScheduled = false;
    }

    public Shift() {

    }

    public double getClockIn() {
        return clockIn;
    }

    public void setClockIn(double clockIn) {
        this.clockIn = clockIn;
    }

    public double getClockOut() {
        return clockOut;
    }

    public void setClockOut(double clockOut) {
        this.clockOut = clockOut;
    }

    public boolean isScheduled() {
        return isScheduled;
    }

    public void setScheduled(boolean scheduled) {
        isScheduled = scheduled;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
    public void setEmployee(Employee employee)
    {
        this.employee = employee;
    }
}
