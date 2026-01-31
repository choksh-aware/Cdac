import React, { useState, useContext, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { X, Menu, User, LogOut, BadgeIndianRupee } from 'lucide-react'
import Sidebar from './Sidebar'
import toast from 'react-hot-toast'
// import logo from '../assets/logo.png'

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false)
  const [showDropDown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)
  const { user, clearUser } = useContext(AppContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear()
    clearUser()
    setShowDropdown(false)
    toast.success('Logged out successfully');
    navigate('/', { replace: true });

    // window.location.reload()
  }

  const handleNavigation = (path) => {
    navigate(path)
    setShowDropdown(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    if (showDropDown) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showDropDown])

  return (
    <div className='flex items-center justify-between gap-5 bg-white border border-b border-gray-200 shadow-xl py-3 px-4 sm:px-7 sticky top-0 z-30'>
      {/* left side menu button */}
      <div className='flex items-center gap-5'>
        <button 
          onClick={() => setOpenSideMenu(!openSideMenu)}
          className='block lg:hidden text-black hover:bg-gray-500 p-1 rounded transition-colors'>
          {openSideMenu ? (
            <X className='text-2xl'/>
          ) : (
            <Menu className='text-2xl'/>
          )}
        </button>

        <button onClick={() => handleNavigation('/')} className='flex items-center gap-2'>
          <div className='w-14 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg flex items-center justify-center'>
            <BadgeIndianRupee className='w-10 h-10 text-white'/>
          </div>
          <span className='text-2xl font-bold text-black truncate'>FinTrack</span>
        </button>
      </div>

      {/* Center - Contact & About Link (visible on larger screens) */}
      <div className='hidden md:flex items-center'>
        <button
          onClick={() => handleNavigation('/')}
          className='flex items-center gap-2 px-4 py-2 text-black hover:bg-gray-200 rounded-lg transition-colors duration-200'>
          <span className='text-sm font-medium'>Home</span>
        </button>
        
        <button
          onClick={() => handleNavigation('/about')}
          className='flex items-center gap-2 px-4 py-2 text-black hover:bg-gray-200 rounded-lg transition-colors duration-200'>
          <span className='text-sm font-medium'>About us</span>
        </button>

        <button 
          onClick={() => handleNavigation('/contact')}
          className='flex items-center gap-2 px-4 py-2 text-black hover:bg-gray-200 rounded-lg transition-colors duration-200'>
          <span className='text-sm font-medium'>Contact us</span>
        </button>
      </div>
      
      {/* Right side - Avatar photo */}
      <div className='relative' ref={dropdownRef}>
        <button 
          onClick={() => setShowDropdown(!showDropDown)}
          className='flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-300 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-800 focus:ring-offset-2'>
          <User className="text-indigo-600" />
        </button>
        {/* dropdown menu */}
        {showDropDown && (
          <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50'>
            {/* user info */}
            <div className='px-4 py-3 border-b border-gray-100'>
              <div className='flex items-center gap-3'>
                <div className='flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full'>
                  <User className='w-4 h-4 text-indigo-600' />
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='text-sm font-medium text-black truncate'>
                    {user ? user.fullName : 'Guest User'}
                  </p>
                  <p className='text-xs text-black truncate'>
                    {user ? user.email : 'Not logged in'}
                  </p>
                </div>
              </div>
            </div>
            {/* Dropdown Options */}
            <div className='py-1'>
              <button 
                onClick={handleLogout}
                className='flex items-center gap-3 w-full px-4 py-2 text-sm text-grey-700 hover:bg-gray-50 transition-colors duration-150'>
                <LogOut className='w-4 h-4 text-black' />
                <span className='text-black'>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Mobile side view */}
      {openSideMenu && (
        <div className='fixed left-0 right-0 bg-slate-900 border-b border-gray-200 lg:hidden z-20 top-[73px]'>
          <Sidebar activeMenu={activeMenu} />
        </div>
      )}
    </div>
  )
}

export default Navbar