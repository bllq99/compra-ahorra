package com.spring.security.jwt.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration configuration = new CorsConfiguration();

        // Permitir los orígenes necesarios
        configuration.setAllowedOriginPatterns(Arrays.asList(
                "https://*.onrender.com", "http://localhost:4200"
        ));

        // Permitir los métodos HTTP necesarios
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // Permitir todos los encabezados
        configuration.setAllowedHeaders(Arrays.asList("*"));

        // Exponer encabezados necesarios si corresponde
        configuration.setExposedHeaders(Arrays.asList("Authorization", "Content-Type"));

        // Permitir credenciales (como cookies o autenticación basada en tokens)
        configuration.setAllowCredentials(true);

        // Configurar las rutas donde aplica la configuración
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return new CorsFilter(source);
    }
}
