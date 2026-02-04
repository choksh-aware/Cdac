const BASE_URL = import.meta.env.VITE_API_URL;

// Validate BASE_URL
if (!BASE_URL) {
    console.error('VITE_API_URL is not defined in environment variables');
}

console.log('API Base URL:', BASE_URL);

const CLOUDINARY_CLOUD_NAME = "dv7tllezh";

const API_ENDPOINTS = {
    LOGIN: "/login",
    REGISTER: "/register",
    GET_USER_INFO: "/profile",
    GET_CATEGORIES: "/categories",
    ADD_CATEGORY: "/categories",
    UPDATE_CATEGORY: (categoryId) => `/categories/${categoryId}`,
    DELETE_CATEGORY: (categoryId) => `/categories/${categoryId}`,
    GET_ALL_INCOMES: "/incomes",
    CATEGORY_BY_TYPE: (type) => `/categories?type=${type}`,
    ADD_INCOME: "/incomes",
    DELETE_INCOME: (incomeId) => `/incomes/${incomeId}`,
    INCOME_EXCEL_DOWNLOAD: "/incomes/excel/download/income",
    EMAIL_INCOME: "/incomes/excel/email/income",
    ADD_EXPENSE: "/expenses",
    GET_ALL_EXPENSES: "/expenses",
    DELETE_EXPENSE: (expenseId) => `/expenses/${expenseId}`,
    EXPENSE_EXCEL_DOWNLOAD: "/expenses/excel/download/expense",
    EMAIL_EXPENSE: "/expenses/excel/email/expense",
    APPLY_FILTERS: "/filter",
    DASHBOARD_DATA: "/dashboard",
    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,

    GOALS: "/goals",
    ADD_GOAL: "/goals",
    ADD_GOAL_AMOUNT: (id) => `/goals/${id}/add`,
    DELETE_GOAL: (id) => `/goals/${id}`,


};

export { BASE_URL, API_ENDPOINTS };
export default API_ENDPOINTS;