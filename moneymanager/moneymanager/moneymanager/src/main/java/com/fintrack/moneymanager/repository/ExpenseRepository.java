package com.fintrack.moneymanager.repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fintrack.moneymanager.entity.ExpenseEntity;

public interface ExpenseRepository extends JpaRepository<ExpenseEntity, Long> {

    // All expenses (latest first)
    List<ExpenseEntity> findByProfile_IdOrderByDateDesc(Long profileId);

    // Latest 5 expenses
    List<ExpenseEntity> findTop5ByProfile_IdOrderByDateDesc(Long profileId);

    // Total expense
    @Query("select sum(e.amount) from ExpenseEntity e where e.profile.id = :profileId")
    BigDecimal findTotalExpenseByProfileId(@Param("profileId") Long profileId);

    // Filter expenses
    List<ExpenseEntity> findByProfile_IdAndDateBetweenAndNameContainingIgnoreCase(
            Long profileId,
            LocalDate startDate,
            LocalDate endDate,
            String keyword,
            Sort sort
    );

    // Expenses between dates
    List<ExpenseEntity> findByProfile_IdAndDateBetween(
            Long profileId,
            LocalDate startDate,
            LocalDate endDate
    );

    // Expenses on a specific date (notifications)
    List<ExpenseEntity> findByProfile_IdAndDate(
            Long profileId,
            LocalDate date
    );
}
