package com.spring.security.jwt.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

@Service
public class JwtUtilService {
    private static final String JWT_SECRET_KEY = "d939e605c07869ec5dd8042090144888bc3daca4c9467d26003e8c01d940451dc5e8c582de4d12fa76ed23ad1e9c4db215624a5c07681fbbf691245f49292fe6d9cf3fcb2cca2257ea41d442f6c2ed8c76ae6571f7d72055878b391a5f24d6bac9c3168193984446bfaaa9c634555b157651edf9731a2cc7d7e51d6dd1419622478dbeed4c961659cd2fc9b2bf0ed555930771a558f91927931543c939ccc9d07d50a4bccc420d0f03e50f0e19a11f73508aa6395ea79d6027a9da0fbc1ba7949902f6e6a8ab0cfb137d33dd7fec26c63fb476c27304086202a5ee7db1046ba91bbbf8558e9fa7c753201530a21f8df33669c3a15bbeca6ad2ade71e9a9a99a260ca7597bd48a38f3da0ccf5524c3e6ce83c911b7e0da311159fb18fb35651d9c3d3fe6b3a6e8d9332c02a2ce9bb461f3fd6da3cb81d7f02dad8f409d625d72b74025b3c09d20affa75852e3e8607aa9adc435a2f03196d89619c5f1dce71754d2ec7143845f54f1dc408aa106b75f6b457609891f09a330d3bf0f1f92a8256e922b893d5ccc6ed65250bc8d4d5343f5594fd073d5202aead69d417f64302d280b97ee0b52848d0ff35bee81c25ebb94ab051ffccac034fd279a8d81700f832b05ba3f684f8e67b3f21b216fd0f5cc4f7e33bac8175934e5f66fc29c0cba1093f09632967f57536bbfb3cc645abd65a152c2ddee766a1801c112a47cdc220a5c";
    private static final long JWT_TIME_VALIDITY = 1000 * 60 * 15;
    private static final long JWT_TIME_REFRESH_VALIDATE = 1000 * 60 * 60 * 24;

    public String generateToken(UserDetails userDetails, String role) {
        var claims = new HashMap<String, Object>();
        claims.put("role", role);
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TIME_VALIDITY))
                .signWith(SignatureAlgorithm.HS512, JWT_SECRET_KEY)
                .compact();
        }

    public String generateRefreshToken(UserDetails userDetails, String role) {
        var claims = new HashMap<String, Object>();
        claims.put("role", role);
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TIME_REFRESH_VALIDATE))
                .signWith(SignatureAlgorithm.HS512, JWT_SECRET_KEY)
                .compact();
    }

    public boolean validateToken(String token, UserDetails userDetails){
        return extractClaim(token, Claims::getSubject).equals(userDetails.getUsername())
                && !extractClaim(token, Claims::getExpiration).before(new Date());
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        Claims claims = Jwts.parser().setSigningKey(JWT_SECRET_KEY).build().parseClaimsJws(token).getBody();
        return claimsResolver.apply(claims);
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

}
