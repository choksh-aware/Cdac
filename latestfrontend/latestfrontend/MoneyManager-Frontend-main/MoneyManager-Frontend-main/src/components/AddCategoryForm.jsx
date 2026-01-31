import React, { useEffect, useState } from 'react'
import Input from './Input';
import EmojiPickerPopup from './EmojiPickerPopup';
import { LoaderCircle } from 'lucide-react';

const AddCategoryForm = ({onAddCategory, initialCategoryData, isEditing}) => {

    const [loading, setLoading] = useState(false);

    const[category, setCategory] = useState({
        name:"",
        type:"income",
        icon:""
    });

    useEffect (() => {
        if(isEditing && initialCategoryData){
            setCategory(initialCategoryData);
        }else{
            setCategory({name : "", type: "income", icon: ""})
        }
    }, [isEditing, initialCategoryData]);

    const categoryTypeOptions = [
        {value:"income", label:"Income"},
        {value:"expense", label:"Expense"},
    ]

    const handleChange = (field, value) => {
        setCategory({...category, [field]: value})
    }
    
    const handleSubmit = async () => {
        setLoading(true);
        try{
            await onAddCategory(category);
        }finally{
            setLoading(false);
        }
    }

  return (
    <div className='p-4'>

        <EmojiPickerPopup
            icon={category.icon}
            onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
        />

        <Input 
            value={category.name}
            onChange={(target) => handleChange("name", target.value)}
            label="Category Name"
            placeholder="e.g. Freelance, Salary, Bonus, Groceries...."
            type="text"
        />

        <Input 
        label="Category Type"
        value={category.type}
        onChange={(target) => handleChange("type", target.value)}
        isSelect={true}
        options={categoryTypeOptions}
        />

        <div className='flex justify-center mt-6'>
            <button
                onClick={handleSubmit}
                type='button' 
                disabled={loading}
                className='add-btn add-btn-fill bg-gradient-to-r from-indigo-600 to-purple-600 h-10 w-20 text-white rounded-md'
            >
                {loading ? (
                    <>
                        <LoaderCircle className='w-4 h-4 animate-spin'/>
                        {isEditing ? "Updating..." : "Saving..."}
                    </>
                ) : (
                    <>
                    {isEditing ? "Update" : "Save"}
                    </>
                )}
            </button>
        </div>
    </div>
  )
}

export default AddCategoryForm;

