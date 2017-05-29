package io.samarth.api.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import io.samarth.api.db.entity.LoanDetails;

public interface LoanDetailsRepository  extends JpaRepository<LoanDetails, String> {

}
