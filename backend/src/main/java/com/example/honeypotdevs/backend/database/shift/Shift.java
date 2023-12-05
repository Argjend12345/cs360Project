package com.example.honeypotdevs.backend.database.shift;

import com.example.honeypotdevs.backend.database.employee.Employee;
import jakarta.persistence.*;

import java.time.LocalTime;

@Entity
public class Shift
{
    @ManyToOne
    @JoinColumn(name="employee_id", nullable=false)
    private Employee employee;

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    private LocalTime clockIn;

    private LocalTime clockOut;

    private boolean isScheduled;


    public Shift(Employee e)
    {
        this.employee = e;
        this.clockIn = LocalTime.of(0, 0);
        this.clockOut = LocalTime.of(0, 0);
        this.isScheduled = false;
    }

    public Shift() {

    }

    public LocalTime getClockIn() {
        return clockIn;
    }

    public void setClockIn(LocalTime clockIn) {
        this.clockIn = clockIn;
    }

    public LocalTime getClockOut() {
        return clockOut;
    }

    public void setClockOut(LocalTime clockOut) {
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
