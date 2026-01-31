import React, { use, useEffect } from 'react'
import Dashboard from '../components/Dashboard'
import UseUser from '../hooks/UseUser'
import InfoCard from '../components/InfoCard';
import { Coins, Wallet, WalletCards} from 'lucide-react';
import { addThousandsSeparator } from '../util/util';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axiosConfig from '../util/axiosConfig';
import API_ENDPOINTS from '../util/apiEndpoints';
import toast from 'react-hot-toast';
import RecentTransactions from '../components/RecentTransactions';
import FinanaceOverview from '../components/FinanaceOverview';
import Transactions from '../components/Transactions';

const Home = () => {

  UseUser();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    if (!loading) true;

    setLoading(true);

    try{
      const response = await axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA);
      if(response.status === 200){
        setDashboardData(response.data);
      }else if(response.status === 401){
        navigate('/login');
      }
    }catch(error){
      console.error("Something went wrong while fetching dashboard data", error);
      toast.error("Something went wrong");
    }finally{
      setLoading(false);
    }
  }

  useEffect (() => {
    fetchDashboardData();
    return () => {};
  }, []);

  return (
    <div>
       <Dashboard activeMenu="Dashboard">
        <div className='my-5 mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {/* Diaplay card details */}
            <InfoCard 
              icon={<Wallet />}
              label="Total Balance"
              value={addThousandsSeparator(dashboardData?.totalBalance || 0.00)} 
              color="bg-gradient-to-r from-indigo-600 to-purple-600"
            />

            <InfoCard 
              icon={<WalletCards />}
              label="Total Income"
              value={addThousandsSeparator(dashboardData?.totalIncome || 0.00)}
              color="bg-gradient-to-r from-green-400 to-green-600"
            />

            <InfoCard 
              icon={<Coins />}
              label="Total Expense"
              value={addThousandsSeparator(dashboardData?.totalExpense || 0.00)}
              color="bg-gradient-to-r from-red-400 to-red-600"
            />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-6'>
            {/* Recent Transactions */}
            <RecentTransactions 
              transactions={dashboardData?.recentTransactions}
              onMore={() => navigate('/expense')}
            />
            {/* Finance Overview chart */}
            <FinanaceOverview 
              totalBalance={dashboardData?.totalBalance || 0.00}
              totalIncome={dashboardData?.totalIncome || 0.00}
              totalExpense={dashboardData?.totalExpense  || 0.00}
            />
            {/* Expense Transactions */}
            <Transactions 
              Transactions={dashboardData?.recent5Expenses || []}
              onMore={() => navigate('/expense')}
              type="expense"
              title="Recent Expense"
            />
            {/* Income Transactions */}
            <Transactions 
              Transactions={dashboardData?.recent5Incomes || []}
              onMore={() => navigate('/income')}
              type="income"
              title="Recent Income"
            />
          </div>
        </div>
       </Dashboard>
    </div>
  )
}

export default Home