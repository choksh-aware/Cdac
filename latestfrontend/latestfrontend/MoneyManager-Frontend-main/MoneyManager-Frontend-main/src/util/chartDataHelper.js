/**
 * Prepares income transaction data for line chart visualization
 * @param {Array} transactions - Array of income transaction objects
 * @returns {Array} Formatted data for chart rendering
 */
export const prepareIncomeLineChartData = (transactions) => {
    if (!transactions || transactions.length === 0) {
        return [];
    }

    // Sort transactions by date
    const sortedTransactions = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));

    // Group transactions by date and sum amounts
    const dailyTotals = sortedTransactions.reduce((acc, transaction) => {
        const date = transaction.date;
        const amount = parseFloat(transaction.amount) || 0;
        
        if (acc[date]) {
            acc[date] += amount;
        } else {
            acc[date] = amount;
        }
        
        return acc;
    }, {});

    // Convert to array format and calculate cumulative totals
    let cumulativeTotal = 0;
    const chartData = Object.entries(dailyTotals).map(([date, dailyTotal]) => {
        cumulativeTotal += dailyTotal;
        
        return {
            date: date,
            formattedDate: formatDateForDisplay(date),
            dailyIncome: dailyTotal,
            cumulativeIncome: cumulativeTotal,
            transactionCount: sortedTransactions.filter(t => t.date === date).length,
            // Add month/year for grouping if needed
            month: new Date(date).toLocaleString('default', { month: 'short' }),
            year: new Date(date).getFullYear(),
            // Add day name for better UX
            dayName: new Date(date).toLocaleDateString('en-US', { weekday: 'short' })
        };
    });

    return chartData;
};

/**
 * Formats date string for display in charts
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {string} Formatted date string
 */
const formatDateForDisplay = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
    });
};

/**
 * Alternative function to prepare monthly aggregated data
 * @param {Array} transactions - Array of income transaction objects
 * @returns {Array} Monthly aggregated data
 */
export const prepareMonthlyIncomeData = (transactions) => {
    if (!transactions || transactions.length === 0) {
        return [];
    }

    const monthlyTotals = transactions.reduce((acc, transaction) => {
        const date = new Date(transaction.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const amount = parseFloat(transaction.amount) || 0;
        
        if (acc[monthKey]) {
            acc[monthKey].total += amount;
            acc[monthKey].count += 1;
        } else {
            acc[monthKey] = {
                total: amount,
                count: 1,
                month: date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
            };
        }
        
        return acc;
    }, {});

    return Object.entries(monthlyTotals).map(([key, data]) => ({
        monthKey: key,
        month: data.month,
        totalIncome: data.total,
        transactionCount: data.count,
        averageIncome: data.total / data.count
    }));
};

/**
 * Get income statistics for overview
 * @param {Array} transactions - Array of income transaction objects
 * @returns {Object} Income statistics
 */
export const getIncomeStats = (transactions) => {
    if (!transactions || transactions.length === 0) {
        return {
            totalIncome: 0,
            averageIncome: 0,
            highestIncome: 0,
            transactionCount: 0,
            thisMonthIncome: 0,
            lastMonthIncome: 0
        };
    }

    const amounts = transactions.map(t => parseFloat(t.amount) || 0);
    const totalIncome = amounts.reduce((sum, amount) => sum + amount, 0);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const thisMonthIncome = transactions
        .filter(t => {
            const tDate = new Date(t.date);
            return tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear;
        })
        .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);

    const lastMonthIncome = transactions
        .filter(t => {
            const tDate = new Date(t.date);
            return tDate.getMonth() === lastMonth && tDate.getFullYear() === lastMonthYear;
        })
        .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);

    return {
        totalIncome,
        averageIncome: totalIncome / transactions.length,
        highestIncome: Math.max(...amounts),
        transactionCount: transactions.length,
        thisMonthIncome,
        lastMonthIncome,
        growthRate: lastMonthIncome > 0 ? ((thisMonthIncome - lastMonthIncome) / lastMonthIncome) * 100 : 0
    };
};


/**
 * Prepares expense transaction data for line chart visualization
 * @param {Array} transactions - Array of expense transaction objects
 * @returns {Array} Formatted data for chart rendering
 */
export const prepareExpenseLineChartData = (transactions) => {
    if (!transactions || transactions.length === 0) {
        return [];
    }

    // Sort transactions by date
    const sortedTransactions = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));

    // Group transactions by date and sum amounts
    const dailyTotals = sortedTransactions.reduce((acc, transaction) => {
        const date = transaction.date;
        const amount = parseFloat(transaction.amount) || 0;
        
        if (acc[date]) {
            acc[date] += amount;
        } else {
            acc[date] = amount;
        }
        
        return acc;
    }, {});

    // Convert to array format and calculate cumulative totals
    let cumulativeTotal = 0;
    const chartData = Object.entries(dailyTotals).map(([date, dailyTotal]) => {
        cumulativeTotal += dailyTotal;
        
        return {
            date: date,
            formattedDate: formatDateForDisplay(date),
            dailyExpense: dailyTotal,
            cumulativeExpense: cumulativeTotal,
            transactionCount: sortedTransactions.filter(t => t.date === date).length,
            // Add month/year for grouping if needed
            month: new Date(date).toLocaleString('default', { month: 'short' }),
            year: new Date(date).getFullYear(),
            // Add day name for better UX
            dayName: new Date(date).toLocaleDateString('en-US', { weekday: 'short' })
        };
    });

    return chartData;
};

/**
 * Get expense statistics for overview
 * @param {Array} transactions - Array of expense transaction objects
 * @returns {Object} Expense statistics
 */
export const getExpenseStats = (transactions) => {
    if (!transactions || transactions.length === 0) {
        return {
            totalExpense: 0,
            averageExpense: 0,
            highestExpense: 0,
            transactionCount: 0,
            thisMonthExpense: 0,
            lastMonthExpense: 0
        };
    }

    const amounts = transactions.map(t => parseFloat(t.amount) || 0);
    const totalExpense = amounts.reduce((sum, amount) => sum + amount, 0);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const thisMonthExpense = transactions
        .filter(t => {
            const tDate = new Date(t.date);
            return tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear;
        })
        .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);

    const lastMonthExpense = transactions
        .filter(t => {
            const tDate = new Date(t.date);
            return tDate.getMonth() === lastMonth && tDate.getFullYear() === lastMonthYear;
        })
        .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);

    return {
        totalExpense,
        averageExpense: totalExpense / transactions.length,
        highestExpense: Math.max(...amounts),
        transactionCount: transactions.length,
        thisMonthExpense,
        lastMonthExpense,
        growthRate: lastMonthExpense > 0 ? ((thisMonthExpense - lastMonthExpense) / lastMonthExpense) * 100 : 0
    };
};


/**
 * Alternative function to prepare monthly aggregated expense data
 * @param {Array} transactions - Array of expense transaction objects
 * @returns {Array} Monthly aggregated data
 */
export const prepareMonthlyExpenseData = (transactions) => {
    if (!transactions || transactions.length === 0) {
        return [];
    }

    const monthlyTotals = transactions.reduce((acc, transaction) => {
        const date = new Date(transaction.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const amount = parseFloat(transaction.amount) || 0;
        
        if (acc[monthKey]) {
            acc[monthKey].total += amount;
            acc[monthKey].count += 1;
        } else {
            acc[monthKey] = {
                total: amount,
                count: 1,
                month: date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
            };
        }
        
        return acc;
    }, {});

    return Object.entries(monthlyTotals).map(([key, data]) => ({
        monthKey: key,
        month: data.month,
        totalExpense: data.total,
        transactionCount: data.count,
        averageExpense: data.total / data.count
    }));
};