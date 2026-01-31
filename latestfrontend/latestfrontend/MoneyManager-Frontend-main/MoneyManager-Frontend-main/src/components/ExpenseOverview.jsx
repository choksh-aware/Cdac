import React, { useEffect, useState } from 'react'
import { prepareExpenseLineChartData, getExpenseStats } from '../util/chartDataHelper'; // Adjust path as needed
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingDown, DollarSign, Calendar, BarChart3 } from 'lucide-react';

const ExpenseOverview = ({transactions, onAddExpense}) => {
    const [chartData, setChartData] = useState([]);
    const [stats, setStats] = useState({});

    useEffect(() => {
        if (transactions && transactions.length > 0) {
            const result = prepareExpenseLineChartData(transactions);
            const expenseStats = getExpenseStats(transactions);
            
            console.log('Chart Data:', result);
            console.log('Expense Stats:', expenseStats);
            
            setChartData(result);
            setStats(expenseStats);
        }
    }, [transactions]);

    // Custom tooltip for the chart
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
                    <p className="text-sm font-medium text-gray-900">{data.formattedDate}</p>
                    <div className="mt-2">
                        <p className="text-lg font-bold text-red-600">
                            ₹{data.cumulativeExpense?.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500">
                            Daily: ₹{data.dailyExpense?.toFixed(2)} • {data.transactionCount} transactions
                        </p>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className='bg-white rounded-lg shadow-lg p-6'>
            {/* Header Section */}
            <div className='flex justify-between items-start mb-6'>
                <div>
                    <h5 className='text-2xl font-bold text-gray-800 mb-2'>
                        Expense Overview
                    </h5>
                    <p className='text-md text-gray-600'>
                        Track your spending and manage your budget effectively.
                    </p>
                </div>
                
                {/* Quick Stats */}
                <div className='grid grid-cols-2 gap-4 text-right'>
                    <div className='bg-red-50 p-3 rounded-lg'>
                        <div className='flex items-center justify-end gap-2'>
                            <DollarSign className='w-4 h-4 text-red-600' />
                            <span className='text-sm text-red-600 font-medium'>Total</span>
                        </div>
                        <p className='text-lg font-bold text-red-700'>
                            ₹{stats.totalExpense?.toFixed(2) || '0.00'}
                        </p>
                    </div>
                    
                    <div className='bg-orange-50 p-3 rounded-lg'>
                        <div className='flex items-center justify-end gap-2'>
                            <BarChart3 className='w-4 h-4 text-orange-600' />
                            <span className='text-sm text-orange-600 font-medium'>Average</span>
                        </div>
                        <p className='text-lg font-bold text-orange-700'>
                            ₹{stats.averageExpense?.toFixed(2) || '0.00'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Chart Section */}
            <div className='mt-6'>
                {chartData.length > 0 ? (
                    <div className='w-full h-80'>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                                <defs>
                                    <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#EF4444" stopOpacity={0.05}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis 
                                    dataKey="dayName" 
                                    tick={{ fontSize: 12, fill: '#6B7280' }}
                                    tickLine={{ stroke: '#E5E7EB' }}
                                    axisLine={{ stroke: '#E5E7EB' }}
                                />
                                <YAxis 
                                    tick={{ fontSize: 12, fill: '#6B7280' }}
                                    tickLine={{ stroke: '#E5E7EB' }}
                                    axisLine={{ stroke: '#E5E7EB' }}
                                    tickFormatter={(value) => `₹${value}`}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                
                                {/* Smooth Area Chart */}
                                <Area 
                                    type="monotone" 
                                    dataKey="cumulativeExpense" 
                                    stroke="#EF4444" 
                                    strokeWidth={3}
                                    fill="url(#expenseGradient)"
                                    dot={{ fill: '#EF4444', strokeWidth: 2, r: 5, stroke: '#fff' }}
                                    activeDot={{ r: 7, stroke: '#EF4444', strokeWidth: 2, fill: '#fff' }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className='flex flex-col items-center justify-center h-64 text-gray-500'>
                        <Calendar className='w-12 h-12 mb-4 text-gray-300' />
                        <p className='text-lg font-medium'>No expense data available</p>
                        <p className='text-sm'>Add some expense transactions to see your overview</p>
                    </div>
                )}
            </div>

            {/* Additional Stats */}
            {chartData.length > 0 && (
                <div className='mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-gray-100'>
                    <div className='text-center'>
                        <p className='text-sm text-gray-500'>This Month</p>
                        <p className='text-xl font-semibold text-gray-800'>
                            ₹{stats.thisMonthExpense?.toFixed(2) || '0.00'}
                        </p>
                    </div>
                    
                    <div className='text-center'>
                        <p className='text-sm text-gray-500'>Highest Expense</p>
                        <p className='text-xl font-semibold text-gray-800'>
                            ₹{stats.highestExpense?.toFixed(2) || '0.00'}
                        </p>
                    </div>
                    
                    <div className='text-center'>
                        <p className='text-sm text-gray-500'>Total Transactions</p>
                        <p className='text-xl font-semibold text-gray-800'>
                            {stats.transactionCount || 0}
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ExpenseOverview;