import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { addThousandsSeparator } from '../util/util'

const CustomPieChart = ({ data, label, totalAmount, colors, showTextAnchor = true }) => {
  
  // Custom tooltip component
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">{data.name}</p>
          <p className="text-sm text-gray-600">
            Amount: <span className="font-medium text-gray-900">₹{addThousandsSeparator(data.amount)}</span>
          </p>
          <p className="text-xs text-gray-500">
            {((data.amount / data.total) * 100).toFixed(1)}% of total
          </p>
        </div>
      )
    }
    return null
  }

  // Custom label function for pie slices
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent < 0.05) return null // Don't show label if slice is too small
    
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  // Process data to add total for percentage calculation
  const totalSum = data.reduce((sum, item) => sum + item.amount, 0)
  const processedData = data.map(item => ({
    ...item,
    total: totalSum
  }))

  // Custom legend component
  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-700 font-medium">
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Chart Container */}
      <div className="relative">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={processedData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={showTextAnchor ? renderCustomizedLabel : false}
              outerRadius={130}
              innerRadius={60}
              fill="#8884d8"
              dataKey="amount"
              animationBegin={0}
              animationDuration={800}
            >
              {processedData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={colors[index % colors.length]}
                  stroke="#fff"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-sm text-gray-600 font-medium">{label}</p>
          <p className="text-xl font-bold text-gray-900 mt-1">{totalAmount}</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3 mt-6">
        {data.map((item, index) => (
          <div 
            key={index}
            className="bg-gray-50 rounded-lg p-3 text-center hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              <span className="text-xs font-medium text-gray-700 truncate">
                {item.name.replace('Total ', '')}
              </span>
            </div>
            <p className="text-sm font-bold text-gray-900">
              ₹{addThousandsSeparator(item.amount)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CustomPieChart;

