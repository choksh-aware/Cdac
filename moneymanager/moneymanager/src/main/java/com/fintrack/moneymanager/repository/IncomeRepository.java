package com.fintrack.moneymanager.repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fintrack.moneymanager.entity.IncomeEntity;

public interface IncomeRepository extends JpaRepository<IncomeEntity, Long> {

    // Latest incomes for current user
    List<IncomeEntity> findByProfile_IdOrderByDateDesc(Long profileId);

    // Top 5 latest incomes
    List<IncomeEntity> findTop5ByProfile_IdOrderByDateDesc(Long profileId);

    // Total income
    @Query("select sum(i.amount) from IncomeEntity i where i.profile.id = :profileId")
    BigDecimal findTotalIncomeByProfileId(@Param("profileId") Long profileId);

    // Filter incomes
    List<IncomeEntity> findByProfile_IdAndDateBetweenAndNameContainingIgnoreCase(
            Long profileId,
            LocalDate startDate,
            LocalDate endDate,
            String keyword,
            Sort sort
    );

    // Incomes between dates
    List<IncomeEntity> findByProfile_IdAndDateBetween(
            Long profileId,
            LocalDate startDate,
            LocalDate endDate
    );
}
