package com.fintrack.moneymanager.controller;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fintrack.moneymanager.entity.ProfileEntity;
import com.fintrack.moneymanager.service.EmailService;
import com.fintrack.moneymanager.service.ExcelService;
import com.fintrack.moneymanager.service.ExpenseService;
import com.fintrack.moneymanager.service.IncomeService;
import com.fintrack.moneymanager.service.ProfileService;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/email")
public class EmailController {

    private final EmailService emailService;
    private final ExpenseService expenseService;
    private final IncomeService incomeService;
    private final ProfileService profileService;
    private final ExcelService excelService;

    @GetMapping("/income-excel")
    public ResponseEntity<Void> EmailIncomeExcel() throws IOException {
        ProfileEntity profile = profileService.getCurrentProfile();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        excelService.writeIncomesToExcel(baos, incomeService.getCurrentMonthIncomeForCurrentUser());
        emailService.sendExcelAttachment(profile.getEmail(),
                "Your Income Excel Report",
                "Please find attached income report",
                baos.toByteArray(),
                "incomes.xlsx");
        return ResponseEntity.ok().build();
    }


    @GetMapping("/expense-excel")
    public ResponseEntity<Void> EmailExpenseExcel() throws IOException , MessagingException {
        ProfileEntity profile = profileService.getCurrentProfile();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        excelService.writeExpensesToExcel(baos, expenseService.getCurrentMonthExpenseForCurrentUser());
        emailService.sendExcelAttachment(profile.getEmail(),
                "Your Expense Excel Report",
                "Please find attached income report",
                baos.toByteArray(),
                "incomes.xlsx");
        return ResponseEntity.ok().build();
    }
}