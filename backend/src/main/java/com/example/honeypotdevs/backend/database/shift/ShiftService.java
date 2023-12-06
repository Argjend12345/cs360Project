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

    public void editShift(int employeeId, int shiftId, Shift newShift)
    {
        List<Shift> s = shiftRepository.findByEmployeeId(employeeId);//Original Shift

        Shift modifyShift = findShiftById(s, shiftId);//Modifying original shift

        modifyShift.setClockIn(newShift.getClockIn());
        modifyShift.setClockOut(newShift.getClockOut());
        modifyShift.setScheduled(newShift.isScheduled());

        shiftRepository.save(modifyShift);
    }

    public Shift findShiftById(List<Shift> shifts, int shiftId)
    {
        for (Shift shift : shifts) {
            if (shift.getShiftId() == shiftId) {
                return shift; // Found the shift with the given shiftId
            }
        }
        return null; // Shift with the specified shiftId not found in the list
    }

    public void deleteEmployeeShifts(int employeeId)
    {
        List<Shift> s = shiftRepository.findByEmployeeId(employeeId);
        deleteShiftsById(s);
    }
    public void deleteShiftsById(List<Shift> shifts)
    {
        for (Shift shift : shifts)
        {
            shiftRepository.deleteById(shift.getId());
        }

    }


    public List<Shift> getEmployeeShifts(int employeeId)
    {

        return shiftRepository.findByEmployeeId(employeeId);
    }
}
