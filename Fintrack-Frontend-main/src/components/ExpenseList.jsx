import { Download, LoaderCircle, Mail } from 'lucide-react';
import React from 'react'
import { useState } from 'react';
import TransactionInfoCard from './TransactionInfoCard';
import moment from 'moment';
 
const ExpenseList = ({transactions, onDelete, onDownload, onEmail}) => {

    const[loading, setLoading] = useState(false);

    const handleEmail = async() => {
        if(loading) return;
        setLoading(true);
        try{
            await onEmail();
        }catch(error){
            console.error("Failed to email expense data:", error);
        }finally{
            setLoading(false);
        }
    }

    const handleDownload = async() => {
        if(loading) return;
        setLoading(true);
        try{
            await onDownload();
        }catch(error){
            console.error("Failed to download expense data:", error);
        }finally{
            setLoading(false);
        }
    }

  return (
    <div className='card '>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg font-semibold text-gray-900'>Expenses</h5>
            <div className='flex items-center justify-end gap-4'>
                <button 
                    onClick={handleEmail} 
                    disabled={loading}
                    className='flex items-center gap-2 cursor-pointer bg-gradient-to-r from-red-400 to-red-600 hover:scale-110 px-3 py-2 rounded-lg text-black transition-colors'>
                    {loading ? (
                        <>
                            <LoaderCircle className='h-4 w-4 animate-spin' />
                            Emailing...
                        </>
                    ) : (
                        <>
                            <Mail size={18} className='text-base' />
                            Email
                        </>
                    )}
                </button>
                <button
                    onClick={handleDownload}
                    disabled={loading}
                    className='flex items-center gap-2 cursor-pointer text-black bg-gradient-to-r from-red-400 to-red-600 hover:scale-110 px-3 py-2 rounded-lg transition-colors'>
                    {loading ? (
                        <>
                            <LoaderCircle className='h-4 w-4 animate-spin' />
                            Downloading...
                        </>
                    ) : (
                        <>
                            <Download size={18} className='text-base' />
                            Download
                        </>
                    )}
                </button>
            </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
            {/* Display expense list here */}
            {transactions?.map((expense) => (
                <TransactionInfoCard 
                    key={expense.id}
                    title={expense.name}
                    icon={expense.icon || null}
                    date={moment(expense.date).format("Do MMM, YYYY")}
                    amount={expense.amount}
                    type="expense"
                    onDelete={() => onDelete(expense.id)}
                />
            ))}
        </div>
    </div>
  )
}

export default ExpenseList;