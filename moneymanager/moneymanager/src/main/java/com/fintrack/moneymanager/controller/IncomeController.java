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

import com.fintrack.moneymanager.dto.IncomeDTO;
import com.fintrack.moneymanager.service.EmailService;
import com.fintrack.moneymanager.service.IncomeService;
import com.fintrack.moneymanager.service.ProfileService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/incomes")
public class IncomeController {

    private final IncomeService incomeService;
    private final ProfileService profileService;
    private final EmailService emailService;

    @PostMapping
    public ResponseEntity<IncomeDTO> addIncome(@RequestBody IncomeDTO dto){
        IncomeDTO saved = incomeService.addIncome(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping
    public ResponseEntity<List<IncomeDTO>> getIncomes(){
    	System.out.println("DEBUG: Hit the getIncomes controller!");
        List<IncomeDTO> incomes = incomeService.getCurrentMonthIncomeForCurrentUser();
        return ResponseEntity.ok(incomes);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIncome(@PathVariable("id") Long id){
        incomeService.deleteIncome(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/excel/download/income")
    public ResponseEntity<byte[]> downloadIncomesExcel() {
        byte[] excelData = incomeService.exportIncomesToExcel();
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=incomes.xlsx")
                .header(HttpHeaders.CONTENT_TYPE, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
                .body(excelData);
    }

    @GetMapping("/excel/email/income")
    public ResponseEntity<String> emailIncomesExcel() {
        byte[] excelData = incomeService.exportIncomesToExcel();
        // Get current user's email (adjust as per your profile/auth logic)
        String to = profileService.getCurrentProfile().getEmail();
        emailService.sendExcelAttachment(
                to,
                "Your Income Excel Sheet",
                "Please find attached your income Excel report.",
                excelData,
                "incomes.xlsx"
        );
        return ResponseEntity.ok("Income Excel sent to your email!");
    }

}