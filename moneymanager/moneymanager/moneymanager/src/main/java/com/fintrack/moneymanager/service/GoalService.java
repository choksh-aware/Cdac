package com.fintrack.moneymanager.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Service;

import com.fintrack.moneymanager.dto.GoalDTO;
import com.fintrack.moneymanager.entity.GoalEntity;
import com.fintrack.moneymanager.entity.ProfileEntity;
import com.fintrack.moneymanager.repository.GoalRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GoalService {

    private final GoalRepository goalRepository;
    private final ProfileService profileService;

    // CREATE GOAL
    public GoalDTO createGoal(GoalDTO dto) {
        ProfileEntity profile = profileService.getCurrentProfile();

        GoalEntity goal = GoalEntity.builder()
                .name(dto.getName())
                .targetAmount(dto.getTargetAmount())
                .deadline(dto.getDeadline())
                .profile(profile)
                .build();

        goal = goalRepository.save(goal);
        return toDTO(goal);
    }

    // GET ALL GOALS
    public List<GoalDTO> getGoals() {
        ProfileEntity profile = profileService.getCurrentProfile();

        return goalRepository
                .findByProfile_IdOrderByCreatedAtDesc(profile.getId())
                .stream()
                .map(this::toDTO)
                .toList();
    }

    // ADD AMOUNT TO GOAL
    public GoalDTO addAmount(Long goalId, BigDecimal amount) {
        GoalEntity goal = goalRepository.findById(goalId)
                .orElseThrow(() -> new RuntimeException("Goal not found"));

        BigDecimal updated = goal.getCurrentAmount().add(amount);
        goal.setCurrentAmount(updated);

        if (updated.compareTo(goal.getTargetAmount()) >= 0) {
            goal.setStatus("COMPLETED");
        }

        goal = goalRepository.save(goal);
        return toDTO(goal);
    }

    // DELETE GOAL
    public void deleteGoal(Long id) {
        goalRepository.deleteById(id);
    }

    private GoalDTO toDTO(GoalEntity g) {
        return GoalDTO.builder()
                .id(g.getId())
                .name(g.getName())
                .targetAmount(g.getTargetAmount())
                .currentAmount(g.getCurrentAmount())
                .deadline(g.getDeadline())
                .status(g.getStatus())
                .createdAt(g.getCreatedAt())
                .updatedAt(g.getUpdatedAt())
                .build();
    }
}
