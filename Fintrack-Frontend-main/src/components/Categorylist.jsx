import { BarChart3, Pencil, Trash2, Plus, TrendingUp, TrendingDown, DollarSign } from 'lucide-react'
import React, { useState } from 'react'

const Categorylist = ({categories = [], onEditCategory, onDeleteCategory, onAddCategory}) => {
  const [hoveredCategory, setHoveredCategory] = useState(null)

  const getTypeIcon = (type) => {
    return type === 'income' ? <TrendingUp size={16} /> : <TrendingDown size={16} />
  }

  const getTypeColor = (type) => {
    return type === 'income' ? 'text-green-600' : 'text-red-600'
  }

  const formatAmount = (amount) => {
    if (!amount) return ''
    return new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      maximumFractionDigits: 0 
    }).format(amount)
  }

  return (
    <div className='bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden'>
      {/* Header */}
      <div className='bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-white/20 rounded-lg backdrop-blur-sm'>
              <BarChart3 size={24} className='text-white' />
            </div>
            <div>
              <h4 className='text-xl font-bold text-white'>Category Sources</h4>
              <p className='text-indigo-100 text-sm'>{categories.length} categories configured</p>
            </div>
          </div>
          {onAddCategory && (
            <button 
              onClick={onAddCategory}
              className='flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg backdrop-blur-sm transition-all duration-200 hover:scale-105'>
              <span className='font-medium '>Add Category</span>
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className='p-6'>
        {categories.length === 0 ? (
          <div className='text-center py-12'>
            <div className='mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4'>
              <BarChart3 size={32} className='text-gray-400' />
            </div>
            <h3 className='text-lg font-semibold text-gray-900 mb-2'>No categories yet</h3>
            <p className='text-gray-500 mb-6'>Create your first category to start organizing your finances</p>
            {onAddCategory && (
              <button 
                onClick={onAddCategory}
                className='inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors'>
                <Plus size={18} />
                Add Your First Category
              </button>
            )}
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {categories.map((category) => (
              <div 
                key={category.id}
                className='group relative bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg hover:border-indigo-300 transition-all duration-300 hover:-translate-y-1'
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color || 'from-gray-100 to-gray-200'} opacity-5 rounded-xl`}></div>
                
                {/* Category Icon */}
                <div className='relative flex items-start justify-between mb-3'>
                  <div className={`p-3 bg-gradient-to-br ${category.color || 'from-indigo-400 to-indigo-600'} rounded-xl shadow-lg`}>
                    {category.icon ? (
                      category.icon.startsWith('http') ? (
                        <img 
                          src={category.icon} 
                          alt={category.name} 
                          className='w-6 h-6 object-contain'
                        />
                      ) : (
                        <span className='text-2xl' role="img" aria-label={category.name}>{category.icon}</span>
                      )
                    ) : (
                      <BarChart3 size={24} className='text-white' />
                    )}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className={`flex items-center gap-1 transition-all duration-200 ${
                    hoveredCategory === category.id ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}>
                    {onEditCategory && (
                      <button 
                        onClick={() => onEditCategory(category)}
                        className='p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200'>
                        <Pencil size={16} />
                      </button>
                    )}
                    {onDeleteCategory && (
                      <button
                        onClick={() => onDeleteCategory(category)}
                        className='p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200'>
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Category Details */}
                <div className='relative space-y-2'>
                  <h3 className='text-lg font-bold text-gray-900 group-hover:text-indigo-700 transition-colors'>
                    {category.name}
                  </h3>
                  
                  <div className='flex items-center justify-between'>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      category.type === 'income' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {getTypeIcon(category.type)}
                      <span className='capitalize'>{category.type}</span>
                    </div>
                    
                    {category.amount && (
                      <div className='text-right'>
                        <p className='text-sm font-bold text-gray-900'>
                          {formatAmount(category.amount)}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Progress bar for visual appeal */}
                  <div className='w-full bg-gray-200 rounded-full h-1.5 mt-3'>
                    <div 
                      className={`bg-gradient-to-r ${category.color || 'from-indigo-400 to-indigo-600'} h-1.5 rounded-full transition-all duration-500`}
                      style={{width: `${Math.min((category.amount || 1000) / 50000 * 100, 100)}%`}}
                    ></div>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color || 'from-indigo-400 to-indigo-600'} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300 pointer-events-none`}></div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary Footer */}
      {categories.length > 0 && (
        <div className='bg-gray-50 px-6 py-4 border-t border-gray-200'>
          <div className='flex items-center justify-between text-sm'>
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-1 text-green-600'>
                <TrendingUp size={16} />
                <span className='font-medium'>
                  {categories.filter(c => c.type === 'income').length} Income
                </span>
              </div>
              <div className='flex items-center gap-1 text-red-600'>
                <TrendingDown size={16} />
                <span className='font-medium'>
                  {categories.filter(c => c.type === 'expense').length} Expense
                </span>
              </div>
            </div>
            <div className='text-gray-500'>
              Total Categories: <span className='font-semibold text-gray-900'>{categories.length}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Categorylist