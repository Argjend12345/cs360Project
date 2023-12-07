package com.example.honeypotdevs.backend.database.shift;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface ShiftRepository extends CrudRepository<Shift, Integer>
{
    @Query("SELECT s FROM Shift s WHERE s.employee.employeeId = :employee_id")
    List<Shift> findByEmployeeId(@Param("employee_id") int employee_id);
}
