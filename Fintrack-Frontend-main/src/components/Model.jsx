import { X } from 'lucide-react';
import React from 'react'

const Model = ({isOpen, onClose, children, title}) => {

    if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/40 backdrop-blur-sm'>
        <div className='relative bg-white rounded-xl shadow-2xl p-8 w-full max-w-xl mx-4 max-h-[90vh] overflow-y-auto'>
            {/* Model header */}
            <div className='flex justify-between items-center mb-4'>
                <h3 className='text-xl font-semibold text-gray-800'>
                    {title}
                </h3>
                <button 
                    type='button'
                    onClick={onClose}
                    className='text-gray-900 hover:text-gray-400 transition-colors duration-200'
                >
                    <X className='h-6 w-6'/>
                </button>
            </div>
            
            {/* Model body */}
            <div className='text-gray-700'>
                {children}
            </div>
        </div>
    </div>
  )
}

export default Model;


