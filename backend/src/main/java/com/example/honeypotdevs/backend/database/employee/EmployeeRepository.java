package com.example.honeypotdevs.backend.database.employee;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends CrudRepository<Employee, Integer>
{
    @Query("SELECT e.name FROM Employee e")
    List<String> getNames();

    @Query("SELECT c FROM Employee c WHERE c.username = :username")
    Optional<Employee> findByUsername(@Param("username") String username);
}
