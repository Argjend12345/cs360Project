package com.example.honeypotdevs.backend.database.shift;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShiftService {

    @Autowired
    private ShiftRepository shiftRepository;

    public void addShift(Shift s)
    {

        //Pass Employee Id, shift Id (1-7)
        //With that create the shift.
       /// Shift newShift = new Shift();//New Shift.

        shiftRepository.save(s);
    }

    public List<Shift> getEmployeeShifts(int employeeId)
    {

        return shiftRepository.findByEmployeeId(employeeId);
    }
}
