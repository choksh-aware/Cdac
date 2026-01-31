import { ArrowBigRight } from 'lucide-react';
import React from 'react'
import TransactionInfoCard from './TransactionInfoCard';
import moment from 'moment';

const RecentTransactions = ({transactions, onMore}) => {
  return (
    <div className='card'>
        <div className='flex items-center justify-between mb-4'>
            <h4 className='text-lg font-medium'>Recent Transactions</h4>
            <button className='card-btn' onClick={onMore}>More
                <ArrowBigRight className='text-base' size={16} />
            </button>
        </div>

        <div className='mt-6'>
            {(transactions || []).slice(0,5)?.map(item => (
                <TransactionInfoCard 
                    key={item.id || `transaction-${index}`}
                    title={item.title}
                    icon={item.icon}
                    date={moment(item.date).format("Do MMM, YYYY")}
                    amount={item.amount}
                    type={item.type}
                    hideDeleteBtn={true}
                />
            ))}
        </div>
    </div>
  )
}

export default RecentTransactions;