package com.example.tictatinfy.tictatinfy.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.example.tictatinfy.tictatinfy.services.SessionService;


@Configuration
public class SessionConfig {
    
    // Serive Objs
    @Bean
    SessionService sessionService() {
        return new SessionService();
    }

    // @Bean
    // SessionRepository sessionRepo() {
    //     return new SessionRepository();
    // }
}
