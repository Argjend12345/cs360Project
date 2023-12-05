package com.example.honeypotdevs.backend.security;

import com.example.honeypotdevs.backend.database.employee.CustomEmployeeDetailsService;
import com.example.honeypotdevs.backend.database.employee.EmployeeDetailsService;
import com.example.honeypotdevs.backend.security.jwt.JwtRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfiguration
{

    @Autowired
    private EmployeeDetailsService employeeDetailsService;

    @Autowired
    private JwtRequestFilter jwtRequestFilter;
    private final CustomEmployeeDetailsService customEmployeeDetailsService;

    public SecurityConfiguration(CustomEmployeeDetailsService customEmployeeDetailsService)
    {
        this.customEmployeeDetailsService = customEmployeeDetailsService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception
    {
        //http.cors();
        http.csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                                .requestMatchers( "/auth").anonymous()
                );
        http
                .authorizeHttpRequests((authorize) -> authorize
                        .anyRequest().authenticated()
                );
        http.csrf(AbstractHttpConfigurer::disable);
        http.sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    protected void configure(AuthenticationManagerBuilder auth) throws Exception
    {
        auth.userDetailsService(customEmployeeDetailsService);
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider()
    {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(customEmployeeDetailsService);
        return authProvider;
    }
}
