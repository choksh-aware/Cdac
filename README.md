# Cdac


<img width="1016" height="626" alt="final_fintrack" src="https://github.com/user-attachments/assets/bfd03215-9364-4342-86de-df744e61cae9" />


Big picture
Central entity: PROFILE (this is the user of the system).
Every other entity (CATEGORY, EXPENSE, INCOME, BUDGET, GOAL, REPORT) is connected to a profile – so nothing exists on its own.

The flow is basically:
Profile → defines Categories → adds Incomes & Expenses in those Categories → sets Budgets & Goals → generates Reports

PROFILE
Represents a user account.
Attributes:
id – primary key (unique id for each user)
full_name
email
password
profile_pic
is_active – to enable/disable accounts
activation_token – for account verification/reset


CATEGORY
Used to group incomes and expenses (e.g., Food, Rent, Salary, etc.).
Attributes:
id – primary key
name – category name
type – usually something like INCOME / EXPENSE


EXPENSE
Represents a single spending transaction.
Attributes:
id – primary key
name – short description (e.g., “Zomato Lunch”)
date
amount
icon – for display


INCOME
Represents a money-in transaction (salary, bonus, rent received, etc.).
Attributes:
id – primary key
name
date
amount
icon


