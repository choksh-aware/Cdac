import { User } from 'lucide-react';
import React from 'react'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { SIDE_BAR_DATA } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({activeMenu}) => {
    const{user} = useContext(AppContext);
    const navigate = useNavigate();
    
    return (
        <div className='w-64 h-[calc(100vh-61px)] bg-white border-gray-200/50 shadow-lg p-5 sticky top-[61px] z-20'>
            <div className='flex flex-col items-center justify-center gap-3 mt-3 mb-7'>
                {user?.profileImageUrl ? (
                    <img src={user?.profileImageUrl || ""} alt="profile image" className='w-20 h-20 bg-slate-400 rounded-full'/>
                ):(
                    <User className='w-20 h-20 text-xl text-black'/>
                )}
                <h5 className='text-gray-900 font-medium leading-6'>{user.fullName || " "}</h5>

                {SIDE_BAR_DATA.map((item, index) => (
                    <button
                        onClick={() => navigate(item.path)}
                        key={`menu_${index}`}
                        className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 hover:bg-gray-500 transition cursor-pointer ${activeMenu === item.Label ? 'bg-gray-800 text-white' : 'text-gray-900 hover:text-black'}`}
                    >
                        <item.icon className='text-xl' />
                        {item.Label}
                    </button>
                    ))
                }

            </div>
        </div>
    )
}

export default Sidebar;