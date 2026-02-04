import React, { useEffect } from 'react'
import { useState } from 'react';
import EmojiPickerPopup from './EmojiPickerPopup';
import Input from './Input';
import set from 'lodash.set';
import { LoaderCircle } from 'lucide-react';

const AddIncomeForm = ({onAddIncome, categories}) => {

    const [income, setIncome] = useState({
        name:'',
        amount: '',
        date: '',
        icon:'',
        categoryId:''
    });

    const [loading, setLoading] = useState(false);
    const categoryOptions = categories.map(category => ({
        value: category.id,
        label: category.name
    }))

    const handleChange = (key, value) => {
        setIncome({ ...income, [key]: value })
    }

    const handleAddIncome = async() => {
        setLoading(true);
        try{
            await onAddIncome(income);
        }finally{

        }
    }

    useEffect(() => {
        if(categories.length > 0 && !income.categoryId){
            setIncome(prev => ({...prev, categoryId: categories[0].id}))
        }
    },[categories, income.categoryId])

  return (
    <div className=''>
        <EmojiPickerPopup 
            icon={income.icon}
            onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
        />

        <Input 
            value={income.name}
            onChange={(target) => handleChange('name', target.value)}
            label="Income Source"
            placeholder="e.g. Salary, Freelance, Investment..."
            type="text"
        />

        <Input 
            label="Category"
            value={income.categoryId}
            onChange={(target) => handleChange('categoryId', target.value)}
            isSelect={true}
            options={categoryOptions}
        />

        <Input 
            value={income.amount}
            onChange={(target) => handleChange('amount', target.value)}
            label="Amount"
            placeholder={"e.g. 1500.00"}
            type="number"
        />

        <Input 
            value={income.date}
            onChange={(target) => handleChange('date', target.value)}
            label="Date"
            placeholder=""
            type="date"
        />
        <div className='flex justify-center mt-6'>
            <button 
                onClick={handleAddIncome}
                disabled={loading}
                type='button' 
                className='flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors min-w-[120px] justify-center'
            >
                {loading ? (
                    <>
                        <LoaderCircle className='animate-spin w-4 h-4'/>Adding...
                    </>
                ) : (
                    <>Add Income</>
                )}
            </button>
        </div>
    </div>
  )
}

export default AddIncomeForm;


