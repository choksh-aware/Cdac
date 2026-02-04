import {React, useEffect, useState}from 'react'
import Dashboard from '../components/Dashboard'
import { Plus } from 'lucide-react'
import Categorylist from '../components/Categorylist'
import axiosConfig from '../util/axiosConfig'
import API_ENDPOINTS from '../util/apiEndpoints'
import toast from 'react-hot-toast'
import Model from '../components/Model'
import AddCategoryForm from '../components/AddCategoryForm'
import UseUser from '../hooks/UseUser' // Add this import

const Category = () => {

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
  const [openUpdateCategoryModal, setOpenUpdateCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  UseUser();
  const fetchCategoryDetails = async() => {
    if(loading) return;
    setLoading(true);
    try{
      const response = await axiosConfig.get(API_ENDPOINTS.GET_CATEGORIES);
      if(response.status === 200){
        setCategories(response.data);
      }
    }catch(error){
      console.error("Failed to fetch categories. Please try again later:", error);
      toast.error(error.message);
    }finally{
      setLoading(false);
    }

  }

  useEffect(() => {
    fetchCategoryDetails();
  },[]);

  const handleAddCategory = async (category) => {
    const {name, type, icon} = category;

    if(!name.trim()){
      toast.error("Category name is required");
      return;
    }
    // ckecl if the category is already exista
    const isDuplicate = categories.some((category) => {
      return category.name.toLowerCase() === name.trim().toLowerCase();
    })
    if(isDuplicate){
      toast.error("Category name already exists");
      return;
    }

    try{
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY, {name, type, icon});
      if(response.status === 201){
        toast.success("Category Added Successfully");
        setOpenAddCategoryModal(false);
        fetchCategoryDetails();
      }
    }catch(error){
      console.log("Error Adding Category:", error);
      toast.error(error.response?.data?.message || "Failed to add categoty");
    }
  }

  const handleEditCategory = (categoryToEdit) => {
    setSelectedCategory(categoryToEdit);
    setOpenUpdateCategoryModal(true);
  }

  const handleUpdateCategory = async (updatedCategory) => {
    const {id, name, type, icon} = updatedCategory;
    if(!name.trim()){
      toast.error("Category name is required");
      return;
    }
    if(!id){
      toast.error("Category Id is missing");
      return;
    }
    try{
      await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id), {name, type, icon});
      setOpenUpdateCategoryModal(false);
      setSelectedCategory(null);
      toast.success("Category updated successfully");
      fetchCategoryDetails();
    }catch(error){
      console.log("Error updating the category:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Failed to update the category");
    }
  }

  const handleDeleteCategory = async (categoryToDelete) => {
  // Get the category ID
    const categoryId = categoryToDelete?.id || categoryToDelete?._id;
    
    if (!categoryId) {
      toast.error("Category ID is missing");
      return;
    }

    // Show confirmation dialog
    const isConfirmed = window.confirm(
      `Are you sure you want to delete "${categoryToDelete.name}" category? This action cannot be undone.`
    );
    
    if (!isConfirmed) {
      return;
    }

    try {
      const response = await axiosConfig.delete(API_ENDPOINTS.DELETE_CATEGORY(categoryId));
      
      if (response.status === 200 || response.status === 204) {
        toast.success("Category deleted successfully");
        // Refresh the category list
        fetchCategoryDetails();
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error(error.response?.data?.message || "Failed to delete category");
    }
  };

  return (
    <div>
      <Dashboard activeMenu="Category">
        <div className='m-5 mx-auto'>
          {/* add button to add category */}
          <div className='flex justify-between items-center mb-5'>
            <h2 className='text-2xl font-semibold '>All Categories</h2>
            <button 
              onClick={() => setOpenAddCategoryModal(true)}
              className='add-btn flex items-center gap-1  bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:scale-110 h-10 p-2 rounded-lg'>
              Add Category 
            </button>

          </div>

          {/* category List */}
          <Categorylist categories={categories} onEditCategory={handleEditCategory} onDeleteCategory={handleDeleteCategory}/>
          {/* In your Category.js component */}
          
          {/* Adding Category model */}
          <Model
            title="Add Category"
            isOpen={openAddCategoryModal}
            onClose={() => setOpenAddCategoryModal(false)}
          >
            <AddCategoryForm onAddCategory={handleAddCategory} />
          </Model>
            
          {/* updating Category model */}
          <Model
            onClose={() => {
              setOpenUpdateCategoryModal(false);
              setSelectedCategory(null);
            }}
            isOpen={openUpdateCategoryModal}
            title="Update Category"
          >
              <AddCategoryForm
                initialCategoryData={selectedCategory} 
                onAddCategory={handleUpdateCategory}
                isEditing={true}
              />
          </Model>
        </div>
       </Dashboard>
    </div>
  )
}

export default Category




