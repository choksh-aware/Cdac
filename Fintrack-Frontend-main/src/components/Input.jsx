import { Eye, EyeOff } from 'lucide-react';
import React from 'react'

const Input = ({label, value="", onChange, placeholder, type, isSelect, options=[]} ) => {

    const[showPassword, setShowPassword] = React.useState(false);
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        onChange(e.target); // Pass only the target
    };

  return (
    <div className='mb-4'>
        <label className='text-[13px] text-gray-950 block mb-1'>{label}</label>
        <div className='relative'>
            
            {
                isSelect ? (
                    <select 
                    className='w-full bg-transparent outline-none border-2 border-indigo-500 rounded-md py-2 px-3 text-gray-950 leading focus:outline-none '
                    value={value || ""}
                    onChange={handleChange}
                    >
                        <option value="">Select {label} </option>
                    {
                        options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))
                    }
                    </select>

                ) : (<input 
                        className='w-full bg-transparent border-2 border-indigo-500 outline-none rounded-md py-2 px-3 pr-10 text-gray-900 leading-tight focus:outline-none '
                        type={type === 'password' ? (showPassword ? 'text' : 'password') : type} 
                        placeholder={placeholder}
                        value={value || ""} // Prevent uncontrolled input warning
                        onChange={handleChange} />)
            }

            {type === 'password' && (
                <span className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer'>
                    {showPassword ? (
                    <Eye 
                        size={20}
                        className='text-slate-400'
                        onClick={togglePasswordVisibility}
                    />
                    ) : (
                    <EyeOff 
                        size={20}
                        className='text-slate-400'
                        onClick={togglePasswordVisibility}
                    />  
                )}
                </span>
            )}
        </div>
        
    </div>
  )
}

export default Input;