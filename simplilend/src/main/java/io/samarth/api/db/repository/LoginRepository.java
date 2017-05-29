package io.samarth.api.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import io.samarth.api.db.entity.Login;

public interface LoginRepository extends JpaRepository<Login, String> {

//	 public Login findByEmail(String email);
}
