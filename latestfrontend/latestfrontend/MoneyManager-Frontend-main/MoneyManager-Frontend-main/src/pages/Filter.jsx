import React, { use } from 'react'
import { useState } from 'react'
import Dashboard from '../components/Dashboard'
import UseUser from '../hooks/UseUser'
import TransactionInfoCard from "../components/TransactionInfoCard";
import axiosConfig from '../util/axiosConfig';
import API_ENDPOINTS from '../util/apiEndpoints';
import toast from 'react-hot-toast';
import moment from 'moment';


const Filter = () => {
  UseUser();

  const [type, setType] = useState('income');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [keyword, setKeyword] = useState('');
  const [sortField, setSortField] = useState('date');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log({type, startDate, endDate, sortOrder, keyword, sortField});
    setLoading(true);
    try{
      const response = await axiosConfig.post(API_ENDPOINTS.APPLY_FILTERS, {
        type,
        startDate,
        endDate,
        keyword,
        sortField,
        sortOrder
      });
      console.log("transactions: ", response.data);
      setTransactions(response.data);
    }catch(error){
      console.log('Faild to fetch transactions: ', error);
      toast.error(error.message || "Failed to fetch transations. Please try again");
    }finally{
      setLoading(false);
    }
  }

  return (
    <div>
      <Dashboard activeMenu="Filters">
        <div className='my-5 mx-auto'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-2xl font-semibold'>Filter Transactions</h2>
          </div>
          <div className='card p-4 mb-4 shadow-2xl rounded-md bg-indigo-50'>
            <div className='flex justify-between items-center mb-4 '>
              <h5 className='text-lg font-semibold '>Select the filters</h5>
            </div>
            <form className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-4'>
              <div>
                <label className='block text-sm font-medium mb-1' htmlFor='type'>Type</label>
                <select value={type} id="type" className='w-full border-2 border-indigo-500 px-3 py-2 rounded' onChange={(e) => setType(e.target.value)}>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
              <div>
                <label htmlFor="startdate" className='block text-sm font-medium mb-1'>Start Date</label>
                <input value={startDate} type="date" id='startdate' className='w-full border-2 border-indigo-500 rounded px-3 py-1.5' onChange={(e) => setStartDate(e.target.value)}/>
              </div>
              <div>
                <label htmlFor="enddate" className='block text-sm font-medium mb-1'>End Date</label>
                <input value={endDate} type="date" id='enddate' className='w-full border-2 border-indigo-500 rounded px-3 py-1.5' onChange={(e) => setEndDate(e.target.value)}/>
              </div>
              <div>
                <label htmlFor="sortfield" className='block text-sm font-medium mb-1'>Sort By</label>
                <select value={sortField} id="sortfield" className='w-full border-2 border-indigo-500 rounded px-3 py-2' onChange={(e) => setSortField(e.target.value)}>
                  <option value="date">Date</option>
                  <option value="amount">Amount</option>
                  <option value="category">Category</option>
                </select>
              </div>
              <div>
                <label htmlFor="sortorder" className='block text-sm font-medium mb-1'>Sort Order</label>
                <select value={sortOrder} id="sortorder" className='w-full border-2 border-indigo-500 rounded px-3 py-2' onChange={(e) => setSortOrder(e.target.value)}>
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
              <div className='sm:col-span-1 md:col-span-1 flex items-end'>
                <div className='w-full'>
                  <label htmlFor="keyword" className='block text-sm font-medium mb-1'>Search</label>
                  <input value={keyword} type="text" placeholder='search...' id="keyword" className='w-full rounded border-2 border-indigo-500 px-3 py-1.5' onChange={(e) => setKeyword(e.target.value)}/>
                </div>
              </div>
              
              <div className="col-span-1 sm:col-span-2 md:col-span-3 flex justify-center">
                <button 
                  onClick={handleSearch} 
                  className='w-1/4 p-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-110 text-white rounded-lg flex items-center justify-center cursor-pointer'
                >Apply
                </button>
              </div>
            </form>
          </div>

          <div className='card p-4 shadow-2xl bg-indigo-50'>
            <div className='flex justify-between items-center mb-4 '>
              <h5 className='text-lg font-semibold '>Transactions</h5>
            </div>
            {transactions.length === 0 && !loading ? (
              <p className='text-gray-600'>Select the filters and click apply to filter the transactions</p>
            ): ""}
            {loading ? (
              <p className='text-gray-600'>Loading transactions</p>
            ) : ("")}

            {transactions.map((transactions) => (
              <TransactionInfoCard 
                key={transactions.id}
                title={transactions.name}
                icon={transactions.icon}
                date={moment(transactions.date).format('Do MM YYYY')}
                amount={transactions.amount}
                type={type}
                hideDeleteBtn
              />
            ))}
          </div>
        </div>
      </Dashboard>
    </div>
  )
}

export default Filter