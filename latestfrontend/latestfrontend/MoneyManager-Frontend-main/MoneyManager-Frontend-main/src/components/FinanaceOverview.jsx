import React from 'react'
import { addThousandsSeparator } from '../util/util';
import CustomPieChart from './CustomPieChart';

const FinanaceOverview = ({totalBalance, totalIncome, totalExpense}) => {
    
   
    const COLORS = ["#4F46E5", "#E7180B", "#31C950"];

    const balanceData = [
        { name: "Total Income", amount: totalIncome || 0 },
        { name: "Total Expense", amount: totalExpense || 0},
        { name: "Total Balance", amount: totalBalance || 0 },
    ];
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Financial Overview</h5>
        </div>
        <CustomPieChart 
        data={balanceData}
        label="Total Balance"
        totalAmount={`₹${addThousandsSeparator(totalBalance)}`}
        colors={COLORS}
        showTextAnchor
        />
    </div>
  )
}

export default FinanaceOverview;