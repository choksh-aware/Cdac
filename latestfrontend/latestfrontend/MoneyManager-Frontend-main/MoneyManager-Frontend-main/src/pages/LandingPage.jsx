import React from 'react'
import { BarChart3, Shield, PieChart, TrendingUp, CheckCircle, ArrowRight, User, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { BadgeIndianRupee, IndianRupee} from 'lucide-react'
import Navigation from '../components/Navigation'

const LandingPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigation = (path) => {
        navigate(path);
        setIsMobileMenuOpen(false); // Close mobile menu on navigation
    };

  const features = [
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Smart Analytics",
      description: "Get detailed insights into your spending patterns with interactive charts and reports."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Private",
      description: "Your financial data is protected with bank-level encryption and security measures."
    },
    {
      icon: <PieChart className="w-8 h-8" />,
      title: "Visual Reports",
      description: "Beautiful pie charts and graphs make understanding your finances simple and intuitive."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Track Progress",
      description: "Monitor your financial goals and see your progress with real-time updates."
    }
  ]

  const benefits = [
    "Easy expense and income tracking",
    "Beautiful visual charts and analytics",
    "Export data to Excel anytime",
    "Secure data encryption",
    "Mobile-friendly responsive design",
    "Category-based organization"
  ]

  return (
    <div className="min-h-screen bg-gray-50">
        <Navigation />
    
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Take Control of Your 
            <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Finances
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Your foundation for secure, intelligent financial management. Effortlessly 
            track your income and expenses to achieve your financial goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => handleNavigation('/signup')}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Start Tracking for Free
            </button>
            <button 
              onClick={() => handleNavigation('/about')}
              className="border-2 border-indigo-600 text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-50 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              Learn More <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-8xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">See Your Finances at a Glance</h2>
            <p className="text-xl text-gray-600">Powerful dashboard with everything you need</p>
          </div>
          
          {/* show Dashboard */}
          <div className="bg-gray-100 rounded-2xl p-8 shadow-lg">
            <div className="bg-slate-900 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <BadgeIndianRupee className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white font-semibold">FinTrack</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-white text-sm">User</span>
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                    <IndianRupee className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Balance</p>
                    <p className="text-xl font-bold text-gray-900">₹84,200</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Income</p>
                    <p className="text-xl font-bold text-gray-900">₹1,85,000</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-red-600 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Expense</p>
                    <p className="text-xl font-bold text-gray-900">₹1,00,800</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-sm">💻</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Freelance</p>
                        <p className="text-sm text-gray-600">10th Jul 2025</p>
                      </div>
                    </div>
                    <span className="text-green-600 font-semibold">+ ₹8,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-sm">🚕</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Uber</p>
                        <p className="text-sm text-gray-600">12th Jul 2025</p>
                      </div>
                    </div>
                    <span className="text-red-600 font-semibold">- ₹300</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Overview</h3>
                <div className="w-32 h-32 mx-auto bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-xs text-gray-600">Total Balance</p>
                      <p className="text-sm font-bold">₹84,200</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-8xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to make financial management effortless and insightful.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 text-white">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Take Control of Your Finances?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Start your journey toward better money management today. It's completely free to get started.
          </p>
          <button 
            onClick={() => handleNavigation('/signup')}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Get Started Now - It's Free!
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <BadgeIndianRupee className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">FinTrack</span>
              </div>
              <p className="text-gray-400 mb-4">
                Simplifying personal finance management for everyone. Take control of your financial future today.
              </p>
            </div>
            <div>
              {/* <h4 className="text-white font-semibold mb-4">Quick Links</h4> */}
              <div className="space-y-2">
                <button onClick={() => handleNavigation('/about')} className="block text-gray-400 hover:text-white transition-colors w-full text-left">About Us</button>
                <button onClick={() => handleNavigation('/contact')} className="block text-gray-400 hover:text-white transition-colors w-full text-left">Contact</button>
                <button onClick={() => handleNavigation('/login')} className="block text-gray-400 hover:text-white transition-colors w-full text-left">Login</button>
                <button onClick={() => handleNavigation('/signup')} className="block text-gray-400 hover:text-white transition-colors w-full text-left">Sign Up</button>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <div className="space-y-2">
                <p className="text-gray-400">support@fintrack.com</p>
                <p className="text-gray-400">+91 99XXXXXX45</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">&copy; 2025 FinTrack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage