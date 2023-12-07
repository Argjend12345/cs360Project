package com.example.honeypotdevs.backend.security;

import javax.crypto.*;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

public class AES256Encryption
{

    private static final String SECRET_KEY_BASE64 = "OuzqaPNvtoAD6u7eb3BTF8oRosWPg1Q/5oz+kyfTZGQ=";
    public static String encrypt(String data)
    {
        try {
            byte[] decodedKey = Base64.getDecoder().decode(SECRET_KEY_BASE64);
            SecretKeySpec secretKey = new SecretKeySpec(decodedKey, "AES");

            Cipher cipher = Cipher.getInstance("AES");
            cipher.init(Cipher.ENCRYPT_MODE, secretKey);

            byte[] encryptedData = cipher.doFinal(data.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(encryptedData);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public static String decrypt(String encryptedData)
    {
        try {
            byte[] decodedKey = Base64.getDecoder().decode(SECRET_KEY_BASE64);
            SecretKeySpec secretKey = new SecretKeySpec(decodedKey, "AES");

            Cipher cipher = Cipher.getInstance("AES");
            cipher.init(Cipher.DECRYPT_MODE, secretKey);

            byte[] decryptedData = cipher.doFinal(Base64.getDecoder().decode(encryptedData));
            return new String(decryptedData, StandardCharsets.UTF_8);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
