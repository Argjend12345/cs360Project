package com.example.honeypotdevs.backend.database.paystub;

import com.example.honeypotdevs.backend.database.employee.Employee;
import jakarta.persistence.*;

@Entity
public class Paystub
{
    @ManyToOne
    @JoinColumn(name="employee_id", nullable=false)
    private Employee employee;

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int id;
    String payday;

    double hoursWorked;

    double grossPay;

    double netPay;

    boolean paid;

    public Paystub() {
    }

    public Paystub(Employee e, String payday, double hoursWorked, double grossPay, double netPay, boolean paid)
    {
        this.employee = e;
        this.payday = payday;
        this.hoursWorked = hoursWorked;
        this.grossPay = grossPay;
        this.netPay = netPay;
        this.paid = paid;
    }

    public String getPayday() {
        return payday;
    }

    public void setPayday(String payday) {
        this.payday = payday;
    }

    public double getHoursWorked() {
        return hoursWorked;
    }

    public void setHoursWorked(double hoursWorked) {
        this.hoursWorked = hoursWorked;
    }

    public double getGrossPay() {
        return grossPay;
    }

    public void setGrossPay(double grossPay) {
        this.grossPay = grossPay;
    }

    public double getNetPay() {
        return netPay;
    }

    public void setNetPay(double netPay) {
        this.netPay = netPay;
    }

    public boolean isPaid() {
        return paid;
    }

    public void setPaid(boolean paid) {
        this.paid = paid;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

}
