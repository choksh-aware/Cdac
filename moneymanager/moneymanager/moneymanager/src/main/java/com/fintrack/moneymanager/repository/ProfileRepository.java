package com.fintrack.moneymanager.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fintrack.moneymanager.entity.ProfileEntity;

public interface ProfileRepository extends JpaRepository<ProfileEntity, Long> {
    // select * from tbl_profiles where email = ?
    Optional<ProfileEntity> findByEmail(String email);

    // select * from tbl_profiles where activation token = ?
    Optional<ProfileEntity> findByActivationToken(String activationToken);

}

