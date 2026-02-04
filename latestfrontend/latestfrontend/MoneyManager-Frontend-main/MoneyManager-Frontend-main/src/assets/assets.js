import { Label } from 'recharts';
import logo from './logo.png';
//import { Coins, FunnelPlus, LayoutDashboard, List, Wallet } from 'lucide-react';
import { Coins, FunnelPlus, LayoutDashboard, List, Wallet, Target } from 'lucide-react';

// import login_bg from './login_bg.jpg';

export const assets = {
  logo,
  // login_bg,
};

export const SIDE_BAR_DATA = [
  {
    id:"01",
    Label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard"
  },

  {
    id:"02",
    Label: "Category",
    icon: List, 
    path: "/category"
  },

  {
    id:"03", 
    Label: "Income",
    icon:Wallet,
    path: "/income"
  },

  {
    id:"04",
    Label: "Expense",
    icon: Coins,
    path: "/expense"
  },

  {
  id: "06",
  Label: "Goals",
  icon: Target,
  path: "/goals"
  },

  {
    id:"05",
    Label: "Filters",
    icon: FunnelPlus,
    path: "/filter"
  }
];