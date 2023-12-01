package com.example.honeypotdevs.backend.database.employee;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.Collection;
import java.util.Collections;
import java.util.Optional;

@Service
public class CustomEmployeeDetailsService implements UserDetailsService
{
    private final EmployeeRepository employeeRepository;

    public CustomEmployeeDetailsService(EmployeeRepository employeeRepository)
    {
        this.employeeRepository = employeeRepository;
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException
    {
        Optional<Employee> employee = employeeRepository.findByUsername(username);
        if (employee.isPresent())
        {
            Employee employee1 = employee.get();
            return User.withUsername(employee1.getUsername())
                    .password(employee1.getPassword())
                    .roles(employee1.getRole())
                    .build();
        } else if (username.equals("admin")) {
            // Hardcoded admin user
            return User.withUsername("admin")
                    .password("pass")
                    .roles("ADMIN")
                    .build();
        }
        throw new UsernameNotFoundException("User not found");
    }
    private Collection<? extends GrantedAuthority> getAuthorities()
    {
        return Collections.singleton(new SimpleGrantedAuthority("ROLE_EMPLOYEE"));
    }
}