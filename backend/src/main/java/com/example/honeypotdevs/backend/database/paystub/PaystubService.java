package com.example.honeypotdevs.backend.database.paystub;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PaystubService
{
    @Autowired
    private PaystubRepository paystubRepository;

    public void addPaystub(Paystub p)
    {
        paystubRepository.save(p);
    }

    public List<Paystub> getEmployeePaystubs(int id)
    {
        return paystubRepository.findByEmployeeId(id);
    }
}
