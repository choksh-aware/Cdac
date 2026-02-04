package com.fintrack.moneymanager.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fintrack.moneymanager.entity.GoalEntity;

public interface GoalRepository extends JpaRepository<GoalEntity, Long> {

    List<GoalEntity> findByProfile_IdOrderByCreatedAtDesc(Long profileId);
}
