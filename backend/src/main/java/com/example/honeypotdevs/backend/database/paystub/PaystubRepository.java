package com.example.honeypotdevs.backend.database.paystub;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

@Repository
public interface PaystubRepository extends CrudRepository<Paystub, Integer>
{
    @Query("SELECT p FROM Paystub p WHERE p.employee.employeeId = :employee_id")
    List<Paystub> findByEmployeeId(@Param("employee_id") int employee_id);
}
