# Cdac


<img width="1920" height="1080" alt="ER" src="https://github.com/user-attachments/assets/f20a56ed-b153-4a32-a684-d6d3b4658f92" />



Big picture<br>
Central entity: PROFILE (this is the user of the system).
Every other entity (CATEGORY, EXPENSE, INCOME, GOAL, REPORT) is connected to a profile – so nothing exists on its own.

The flow is basically:
Profile → defines Categories → adds Incomes & Expenses in those Categories → sets Budgets & Goals → generates Reports

PROFILE<br>
Represents a user account.
Attributes:
id – primary key (unique id for each user)
full_name
email
password
profile_pic
is_active – to enable/disable accounts
activation_token – for account verification/reset


CATEGORY<br>
Used to group incomes and expenses (e.g., Food, Rent, Salary, etc.).
Attributes:
id – primary key
name – category name
type – usually something like INCOME / EXPENSE


EXPENSE<br>
Represents a single spending transaction.
Attributes:
id – primary key
name – short description (e.g., “Zomato Lunch”)
date
amount
icon – for display


INCOME<br>
Represents a money-in transaction (salary, bonus, rent received, etc.).
Attributes:
id – primary key
name
date
amount
icon


 GOAL<br>
Represents a financial target (save X amount by some date).
Attributes:
id – primary key
name – e.g., “New Laptop”
target_amount
start_date
end_date
status – e.g., IN_PROGRESS, COMPLETED, FAILED



REPORT(excel sheet)<br>
Represents a generated summary of finances for a time range.
Attributes:
id – primary key
name – e.g., “Monthly Report – Nov 2025”
start_date
end_date
total_income
total_expense
balance – usually total_income - total_expense
status – e.g., GENERATED, VIEWED, etc.



