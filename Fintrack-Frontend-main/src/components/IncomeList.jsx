import { Download, LoaderCircle, Mail } from 'lucide-react';
import React from 'react'
import { useState } from 'react';
import TransactionInfoCard from './TransactionInfoCard';
import momemnt from 'moment';


const IncomeList = ({transactions, onDelete, onDownload, onEmail}) => {

    const[loading, setLoading] = useState(false);

    const handleEmail = async() => {
        if(loading) return;
        setLoading(true);
        try{
            await onEmail();
        }catch(error){
            console.error("Failed to email income data:", error);
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
            console.error("Failed to download income data:", error);
        }finally{
            setLoading(false);
        }
    }


  return (
    <div className='card '>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg font-medium text-gray-900'>Income Sources</h5>
            <div className='flex items-center justify-end gap-4'>
                <button 
                    onClick={handleEmail} 
                    disabled={loading}
                    className='flex items-center gap-2 cursor-pointer bg-gradient-to-r from-emerald-500 to-green-700 text-white hover:scale-110 px-3 py-2 rounded-lg transition-colors'>
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
                    className='flex items-center gap-2 cursor-pointer bg-gradient-to-r from-emerald-500 to-green-700 text-white hover:scale-110 px-3 py-2 rounded-lg transition-colors'>
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
            {/* Display income list here */}
            {transactions?.map((income) => (
                <TransactionInfoCard 
                    key={income.id}
                    title={income.name}
                    icon={income.icon || null}
                    date={momemnt(income.date).format("Do MMM, YYYY")}
                    amount={income.amount}
                    type="income"
                    onDelete={() => onDelete(income.id)}
                />
            ))}
        </div>
    </div>
  )
}

export default IncomeList;