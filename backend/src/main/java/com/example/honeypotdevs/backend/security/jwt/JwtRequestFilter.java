package com.example.honeypotdevs.backend.security.jwt;

import com.example.honeypotdevs.backend.database.employee.CustomEmployeeDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.net.URLDecoder;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private CustomEmployeeDetailsService userDetailsService;

    @Autowired
    private JwtTokenUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        final String authorizationHeader = request.getHeader("Authorization");

        String username = null;
        String jwt = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
            jwt = URLDecoder.decode(jwt, "UTF-8"); // Decode the token

            username = jwtUtil.extractUsername(jwt);
            System.out.println("USER: " + username);//Did get to here. and it did give me proper username
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null)
        {
            System.out.println("HERE.");
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
            System.out.println("Here2.");


            if (jwtUtil.validateToken(jwt, userDetails))
            {
                System.out.println("Here3.");
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                System.out.println("Here4.");
                usernamePasswordAuthenticationToken
                        .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                System.out.println("Here5.");
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                System.out.println("here6.");
            }
        }
        chain.doFilter(request, response);
    }

}
