package com.example.tictatinfy.tictatinfy.repo;

import java.util.*;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;
import com.example.tictatinfy.tictatinfy.POJO.Session;

@Repository
public interface SessionRepository extends CrudRepository<Session, Long> {
    
    List<Session> findBySessionid(String id);

}
