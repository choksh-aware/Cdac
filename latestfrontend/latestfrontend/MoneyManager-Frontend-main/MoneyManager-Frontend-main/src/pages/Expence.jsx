import React, { useEffect, useState } from 'react'
import Dashboard from '../components/Dashboard'
import UseUser from '../hooks/UseUser';
import axiosConfig from '../util/axiosConfig';
import API_ENDPOINTS from '../util/apiEndpoints';
import toast from 'react-hot-toast';
import ExpenseList from '../components/ExpenseList';
import Model from '../components/Model';
import AddExpenseForm from '../components/AddExpenseForm';
import DeleteAlert from '../components/DeleteAlert';
import ExpenseOverview from '../components/ExpenseOverview';

const Expense = () => {

  UseUser();

  const [expenseData, setExpenseData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddExpenseModel, setOpenAddExpenseModal] = useState(false);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const fetchExpenseDetails = async() => {
    if(loading) return;
    setLoading(true);
   
    try{
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSES);
      if(response.status === 200){
        console.log("Expense list", response.data);
        setExpenseData(response.data);
      }
    }catch(error){
      console.error("Failed to fetch expense details:", error);
      toast.error(error.response?.data?.message || "Failed to fetch expense details");
    }finally{
      setLoading(false);
    }
  }

  // fetch categories for expense
  const fetchExpenseCategories = async() => {
    try{
      const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("expense"));
      if(response.status === 200){
        // console.log("Expense categories", response.data);
        setCategories(response.data);
      }
    }catch(error){
      console.error("Failed to fetch expense categories:", error);
      toast.error(error.data?.message || "Failed to fetch expense categories for this category");
    }
  }

  // Save the Expense details
  const handleAddExpense = async(expense) => {
    const{name, amount, date, icon, categoryId} = expense;

    // Validate the input fields
    if(!name.trim()){
      toast.error("Please enter a valid expense name");
      return;
    }
    if(!amount || isNaN(amount) || Number(amount) <= 0){
      toast.error("Please enter a valid expense amount");
      return;
    }
    if(!date){
      toast.error("Please select a valid date for the expense");
      return;
    }
    const today = new Date().toISOString().split('T')[0];
    if(date > today){
      toast.error("Expense date cannot be in the future");
      return;
    }
    if(!categoryId){
      toast.error("Please select a valid category for the expense");
      return;
    }

    try{
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
        name,
        amount: Number(amount),
        date,
        icon,
        categoryId
      });
      if(response.status === 201){
        console.log("Expense added successfully", response.data);
        toast.success("Expense added successfully");
        // Close the modal
        setOpenAddExpenseModal(false);
        // Refresh the expense list
        fetchExpenseDetails();
      }
    }catch(error){
      console.error("Failed to add expense:", error);
      toast.error(error.response?.data?.message || "Failed to add expense");
    }
  }

  // Delete expense
  const deleteExpense = async(expenseId) => {

    try{
      await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(expenseId));
        // Close the modal
        setOpenDeleteAlert({show: false, data: null});
        toast.success("Expense deleted successfully");
        // Refresh the expense list
        fetchExpenseDetails();
      
    }catch(error){
      console.error("Failed to delete expense:", error);
      toast.error(error.response?.data?.message || "Failed to delete expense");
    }
    
  }

  // Download expense details as excel
  const handleDownloadExpenseDetails = async () => {
    
    try{
      const response = await axiosConfig.get(API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD, {
        responseType: 'blob', // Important
      });
      let filename = "Expense_Details.xlsx";
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Expense details downloaded successfully");
    }catch(error){
      console.error("Failed to download expense details",error);
      toast.error(error.response?.data?.message || "Failed to download expense details");
    }
  }

  // Email expense details
  const handleEmailDetails = async() => {
 
    try{
      const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_EXPENSE);
      if(response.status === 200){
        toast.success("Expense details emailed successfully");
      }
    }catch(error){
      console.error("Failed to email expense details",error);
      toast.error(error.response?.data?.message || "Failed to email expense details");
    }
  }

  useEffect(() => {
    fetchExpenseDetails();
    fetchExpenseCategories();
  },[]);

  return (
    <div>
      <Dashboard activeMenu="Expense">
        <div className='my-5 mx-auto'>
          <div className='grid grid-cols-1 gap-6'>
            <div>
              {/* Overview of Expense with line chart*/}
              <button className='add-btn bg-gradient-to-r from-red-400 to-red-600 hover:scale-110 h-10 px-3 py-2 rounded-lg' onClick={() => setOpenAddExpenseModal(true)}>
                Add Expense
              </button>
              <ExpenseOverview transactions={expenseData} onAddExpense={() => setOpenAddExpenseModal(true)} />
            </div> 

            <ExpenseList 
              transactions={expenseData} 
              onDelete={(id) => setOpenDeleteAlert({show: true, data: id})}
              onDownload={handleDownloadExpenseDetails}
              onEmail={handleEmailDetails}
            />

            {/* Add Expense Model */}
            <Model
              isOpen={openAddExpenseModel}
              onClose={() => setOpenAddExpenseModal(false)}
              title="Add Expense"
            >
              {/* Add expense form */}
              <AddExpenseForm 
              onAddExpense={(expense) => handleAddExpense(expense)}
              categories={categories}
              />
            </Model>
            {/* Delete Expense Model */}
            <Model 
              isOpen={openDeleteAlert.show}
              onClose={() => setOpenDeleteAlert({show: false, data: null})}
              title="Delete Expense"
            >
              {/* Delete alert */}
              <DeleteAlert 
                content={"Are you sure you want to delete this expense? This action cannot be undone."}
                onDelete={() => deleteExpense(openDeleteAlert.data)}
              />
            </Model>
          </div>
        </div>
      </Dashboard>
    </div>
  )
}

export default Expense;