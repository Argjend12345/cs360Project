package com.example.honeypotdevs.backend.security.auth;

import com.example.honeypotdevs.backend.database.employee.CustomEmployeeDetailsService;
import com.example.honeypotdevs.backend.security.AES256Encryption;
import com.example.honeypotdevs.backend.security.jwt.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController
{

    private final CustomEmployeeDetailsService customEmployeeDetailsService;
    private final JwtTokenUtil jwtTokenUtil;
    private static final AES256Encryption encryper = new AES256Encryption();

    @Autowired
    public AuthController(CustomEmployeeDetailsService customEmployeeDetailsService, JwtTokenUtil jwtTokenUtil)
    {
        this.customEmployeeDetailsService = customEmployeeDetailsService;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @RequestMapping(method = RequestMethod.POST, value ="/auth")
    public ResponseEntity<?> authenticate(@RequestBody AuthRequest authRequest)
    {
        AuthResponse authResponse = new AuthResponse();
        String token;
        String role;
        if(!authRequest.getUser().equals("admin"))
        {
            //Checks for employee logins.
            UserDetails userDetails = customEmployeeDetailsService.loadUserByUsername(authRequest.getUser());

            userDetails.getAuthorities();

            String inputPass = "";
            String actualPass = "0";
            boolean match = false;

            if(userDetails != null)
            {
                inputPass = encryper.decrypt(authRequest.getPass());
                actualPass = encryper.decrypt(userDetails.getPassword());
                if(inputPass.equals(actualPass))
                {
                    match = true;
                }
            }

            if (userDetails != null && match)
            {
                // Generate JWT token
                token = jwtTokenUtil.generateToken(userDetails);
                role = userDetails.getAuthorities().iterator().next().getAuthority(); // Get the role

                //Prepare for Json sending
                authResponse.setToken(token);
                authResponse.setRole(role);

                return ResponseEntity.ok(authResponse);
            } else {
                // Unauthorized User
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error making token");
            }
        }else{
            //Verify Admin Pass. Grant Token.
            //First we need to decrypt, then compare hashed vals
            String decryptedPass = encryper.decrypt(authRequest.getPass());

            if(decryptedPass.equals("10/w7o2juYBrGMh32/KbveULW9jk2tejpyUAD+uC6PE="))
            {
                //Create admin user details:
                UserDetails adminDetails = customEmployeeDetailsService.loadUserByUsername("admin");

                // Generate JWT token & get user role
                token = jwtTokenUtil.generateToken(adminDetails);
                role = adminDetails.getAuthorities().iterator().next().getAuthority(); // Get the role

                //Prepare for Json sending
                authResponse.setToken(token);
                authResponse.setRole(role);

                return ResponseEntity.ok(authResponse);
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error making token");
    }
}
