import React, { useState, useEffect } from 'react'
import { Shield, Target, Users, TrendingUp, Award, CheckCircle, BarChart3, PieChart, Smartphone } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Navigation from '../components/Navigation'

const AboutUs = () => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [])

  const features = [
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Smart Analytics",
      description: "Get detailed insights into your spending patterns with interactive charts and reports."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Bank-Level Security",
      description: "Your financial data is protected with enterprise-grade encryption and security measures."
    },
    {
      icon: <PieChart className="w-8 h-8" />,
      title: "Visual Reports",
      description: "Beautiful pie charts and graphs make understanding your finances simple and intuitive."
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile Responsive",
      description: "Access your financial dashboard anywhere, anytime on any device with our responsive design."
    }
  ]

  const stats = [
    { number: "10,000+", label: "Active Users" },
    { number: "₹50M+", label: "Transactions Tracked" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" }
  ]

  const teamValues = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Our Mission",
      description: "To simplify personal finance management and help individuals achieve their financial goals through intuitive technology."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Our Vision",
      description: "To become the most trusted personal finance platform, empowering millions to take control of their financial future."
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Our Values",
      description: "Transparency, security, and user-first design drive everything we do. Your financial success is our success."
    }
  ]

  return (
    <div>
      {isLoggedIn ? <Navbar /> : <Navigation />}
    
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-8xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 mt-4">
              About <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">FinTrack</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Your trusted partner in personal finance management. We're dedicated to making financial tracking 
              simple, secure, and insightful for everyone.
            </p>
          </div>

          {/* Story Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    FinTrack was born from a simple frustration: managing personal finances shouldn't be complicated. 
                    Traditional budgeting tools were either too complex or too basic, leaving users struggling to gain 
                    real insights into their spending habits.
                  </p>
                  <p>
                    We set out to build something different - a platform that combines powerful analytics with 
                    intuitive design, making financial management accessible to everyone regardless of their 
                    technical expertise.
                  </p>
                  <p>
                    Today, thousands of users trust FinTrack to track their income, expenses, and financial goals. 
                    We're proud to be part of their journey toward financial wellness.
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl md:text-3xl font-bold text-indigo-600 mb-2">
                        {stat.number}
                      </div>
                      <div className="text-sm text-gray-600 font-medium">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mission, Vision, Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {teamValues.map((value, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4 text-white">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>

          {/* Features Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What Makes Us Different</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We've built FinTrack with features that truly matter for personal finance management.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center mb-6 text-white">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose MoneyManager */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose FinTrack?</h2>
              <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
                Join thousands of users who have transformed their financial lives with our platform.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                "Easy-to-use interface designed for everyone",
                "Comprehensive expense and income tracking",
                "Beautiful visual reports and analytics",
                "Secure data encryption and privacy protection",
                "Export your data anytime in Excel format",
                "Regular updates and new features"
              ].map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0 mt-0.5" />
                  <span className="text-indigo-100">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Built with Care</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              FinTrack is crafted by a dedicated team of developers, designers, and financial experts 
              who are passionate about helping people achieve financial wellness.
            </p>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 text-indigo-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900">Continuous Innovation</h4>
                  <p className="text-sm text-gray-600">Always improving based on user feedback</p>
                </div>
                <div className="hidden md:block w-px h-16 bg-gray-300"></div>
                <div className="text-center">
                  <Users className="w-12 h-12 text-indigo-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900">User-Centric Design</h4>
                  <p className="text-sm text-gray-600">Every feature designed with you in mind</p>
                </div>
                <div className="hidden md:block w-px h-16 bg-gray-300"></div>
                <div className="text-center">
                  <Shield className="w-12 h-12 text-indigo-600 mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900">Security First</h4>
                  <p className="text-sm text-gray-600">Your data protection is our top priority</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Take Control?</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Join our community of financially empowered users and start your journey toward better finance management today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => navigate('/signup')}
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                  Get Started Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs