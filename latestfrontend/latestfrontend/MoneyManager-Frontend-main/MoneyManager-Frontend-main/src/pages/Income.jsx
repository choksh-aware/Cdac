import React, { useEffect, useState } from 'react'
import Dashboard from '../components/Dashboard'
import UseUser from '../hooks/UseUser';
import axiosConfig from '../util/axiosConfig';
import API_ENDPOINTS from '../util/apiEndpoints';
import toast from 'react-hot-toast';
import IncomeList from '../components/IncomeList';
import Model from '../components/Model';
import AddIncomeForm from '../components/AddIncomeForm';
import DeleteAlert from '../components/DeleteAlert';
import IncomeOverview from '../components/IncomeOverview';


const Income = () => {

  UseUser();

  const [incomeData, setIncomeData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddIncomeModel, setOpenAddIncomeModal] = useState(false);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const fetchIncomeDetails = async() => {
    if(loading) return;
    setLoading(true);
   
    try{
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
      if(response.status === 200){
        console.log("Income list", response.data);
        setIncomeData(response.data);
      }
    }catch(error){
      console.error("Failed to fetch income details:", error);
      toast.error(error.response?.data?.message || "Failed to fetch income details");
    }finally{
      setLoading(false);
    }
  }

  // fetch categories for income
  const fetchIncomeCategories = async() => {
    try{
      const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("income"));
      if(response.status === 200){
        // console.log("Income categories", response.data);
        setCategories(response.data);
      }
    }catch(error){
      console.error("Failed to fetch income categories:", error);
      toast.error(error.data?.message || "Failed to fetch income categories for this category");
    }
  }

  // Save the Income details
  const handleAddIncome = async(income) => {
    const{name, amount, date, icon, categoryId} = income;

    // Validate the input fields
    if(!name.trim()){
      toast.error("Please enter a valid income source name");
      return;
    }
    if(!amount || isNaN(amount) || Number(amount) <= 0){
      toast.error("Please enter a valid income amount");
      return;
    }
    if(!date){
      toast.error("Please select a valid date for the income");
      return;
    }
    const today = new Date().toISOString().split('T')[0];
    if(date > today){
      toast.error("Income date cannot be in the future");
      return;
    }
    if(!categoryId){
      toast.error("Please select a valid category for the income");
      return;
    }

    try{
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME, {
        name,
        amount: Number(amount),
        date,
        icon,
        categoryId
      });
      // if(response.status === 201){
      //   console.log("Income added successfully", response.data);
      //   toast.success("Income added successfully");
      //   // Close the modal
      //   setOpenAddIncomeModal(false);
      //   // Refresh the income list
      //   fetchIncomeCategories();
      // }
      if(response.status === 201){
  console.log("Income added successfully", response.data);
  toast.success("Income added successfully");

  setOpenAddIncomeModal(false);

  // ✅ Refresh income list
  fetchIncomeDetails();
}

    }catch(error){
      console.error("Failed to add income:", error);
      toast.error(error.response?.data?.message || "Failed to add income");
    }
  }

  // Delete income
  const deleteIncome = async(incomeId) => {

    try{
      await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(incomeId));
        // Close the modal
        setOpenDeleteAlert({show: false, data: null});
        toast.success("Income deleted successfully");
        // Refresh the income list
        fetchIncomeDetails();
      
    }catch(error){
      console.error("Failed to delete income:", error);
      toast.error(error.response?.data?.message || "Failed to delete income");
    }
    
  }

  // Download income details as excel
  const handleDownloadIncomeDetails = async () => {
    
    try{
      const response = await axiosConfig.get(API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD, {
        responseType: 'blob', // Important
      });
      let filename = "Income_Details.xlsx";
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Income details downloaded successfully");
    }catch(error){
      console.error("Failed to download income details",error);
      toast.error(error.response?.data?.message || "Failed to download income details");
    }
  }

  // Email income details
  const handleEmailDetails = async() => {
 
    try{
      const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_INCOME);
      if(response.status === 200){
        toast.success("Income details emailed successfully");
      }
    }catch(error){
      console.error("Failed to email income details",error);
      toast.error(error.response?.data?.message || "Failed to email income details");
    }
  }

  useEffect(() => {
    fetchIncomeDetails();
    fetchIncomeCategories();
  },[]);

  return (
    <div>
      <Dashboard activeMenu="Income">
        <div className='my-5 mx-auto'>
          <div className='grid grid-cols-1 gap-6'>
            <div>
              {/* Overview of Income with line chart*/}
              <button className='add-btn  bg-gradient-to-r from-emerald-500 to-green-700 text-white hover:scale-110 h-10 px-3 py-2 rounded-lg' onClick={() => setOpenAddIncomeModal(true)}>
                Add Income
              </button>
              <IncomeOverview transactions={incomeData} onAddIncome={() => setOpenAddIncomeModal(true)} />
            </div> 

            <IncomeList 
              transactions={incomeData} 
              onDelete={(id) => setOpenDeleteAlert({show: true, data: id})}
              onDownload={handleDownloadIncomeDetails}
              onEmail={handleEmailDetails}
            />

            {/* Add Income Model */}
            <Model
              isOpen={openAddIncomeModel}
              onClose={() => setOpenAddIncomeModal(false)}
              title="Add Income"
            >
              {/* Add income form */}
              <AddIncomeForm 
              onAddIncome={(income) => handleAddIncome(income)}
              categories={categories}
              />
            </Model>
            {/* Delete Income Model */}
            <Model 
              isOpen={openDeleteAlert.show}
              onClose={() => setOpenDeleteAlert({show: false, data: null})}
              title="Delete Income"
            >
              {/* Delete alert */}
              <DeleteAlert 
                content={"Are you sure you want to delete this income? This action cannot be undone."}
                onDelete={() => deleteIncome(openDeleteAlert.data)}
              />
            </Model>
          </div>
        </div>
      </Dashboard>
    </div>
  )
}

export default Income;


