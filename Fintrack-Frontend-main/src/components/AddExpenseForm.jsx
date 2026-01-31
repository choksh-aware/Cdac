import React, { useEffect } from 'react'
import { useState } from 'react';
import EmojiPickerPopup from './EmojiPickerPopup';
import Input from './Input';
import { LoaderCircle } from 'lucide-react';

const AddExpenseForm = ({onAddExpense, categories}) => {

    const [expense, setExpense] = useState({
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
        setExpense({ ...expense, [key]: value })
    }

    const handleAddExpense = async() => {
        setLoading(true);
        try{
            await onAddExpense(expense);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        if(categories.length > 0 && !expense.categoryId){
            setExpense(prev => ({...prev, categoryId: categories[0].id}))
        }
    },[categories, expense.categoryId])

  return (
    <div className=''>
        <EmojiPickerPopup 
            icon={expense.icon}
            onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
        />

        <Input 
            value={expense.name}
            onChange={(target) => handleChange('name', target.value)}
            label="Expense Name"
            placeholder="e.g. Groceries, Rent, Transportation..."
            type="text"
        />

        <Input 
            label="Category"
            value={expense.categoryId}
            onChange={(target) => handleChange('categoryId', target.value)}
            isSelect={true}
            options={categoryOptions}
        />

        <Input 
            value={expense.amount}
            onChange={(target) => handleChange('amount', target.value)}
            label="Amount"
            placeholder={"e.g. 250.00"}
            type="number"
        />

        <Input 
            value={expense.date}
            onChange={(target) => handleChange('date', target.value)}
            label="Date"
            placeholder=""
            type="date"
        />
        <div className='flex justify-center mt-6'>
            <button 
                onClick={handleAddExpense}
                disabled={loading}
                type='button' 
                className='flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors min-w-[120px] justify-center'
            >
                {loading ? (
                    <>
                        <LoaderCircle className='animate-spin w-4 h-4'/>Adding...
                    </>
                ) : (
                    <>Add Expense</>
                )}
            </button>
        </div>
    </div>
  )
}

export default AddExpenseForm;