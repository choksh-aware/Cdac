package com.fintrack.moneymanager.controller;

import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fintrack.moneymanager.dto.ExpenseDTO;
import com.fintrack.moneymanager.service.EmailService;
import com.fintrack.moneymanager.service.ExpenseService;
import com.fintrack.moneymanager.service.ProfileService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;
    private final ProfileService profileService;
    private final EmailService emailService;

    @PostMapping
    public ResponseEntity<ExpenseDTO> addExpense( @RequestBody ExpenseDTO dto){
        ExpenseDTO saved = expenseService.addExpense(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping
    public ResponseEntity<List<ExpenseDTO>> getExpenses(){
        return ResponseEntity.ok(
            expenseService.getAllExpensesForCurrentUser()
        );
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable("id") Long id){
        expenseService.deleteExpense(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/excel/download/expense")
    public ResponseEntity<byte[]> downloadExpensesExcel() {
        byte[] excelData = expenseService.exportExpensesToExcel();
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=expenses.xlsx")
                .header(HttpHeaders.CONTENT_TYPE, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
                .body(excelData);
    }

    @GetMapping("/excel/email/expense")
    public ResponseEntity<String> emailExpensesExcel() {
        byte[] excelData = expenseService.exportExpensesToExcel();
        // Get current user's email (adjust as per your profile/auth logic)
        String to = profileService.getCurrentProfile().getEmail();
        emailService.sendExcelAttachment(
                to,
                "Your Expense Excel Sheet",
                "Please find attached your expense Excel report.",
                excelData,
                "expenses.xlsx"
        );
        return ResponseEntity.ok("Expense Excel sent to your email!");
    }
}