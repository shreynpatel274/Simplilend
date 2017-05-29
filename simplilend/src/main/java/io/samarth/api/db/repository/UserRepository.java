package io.samarth.api.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import io.samarth.api.db.entity.User;

public interface UserRepository extends JpaRepository<User, String> {

}
