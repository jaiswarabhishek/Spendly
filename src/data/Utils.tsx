import {format,startOfMonth,lastDayOfMonth,subMonths,endOfMonth,toDate} from 'date-fns'

// Define the function to get the start and end date based on the selection
export const getDateRange = (selection:string) => {
  const now = new Date();
  let startDate, endDate;

  switch (selection) {
    case 'This Month':
      startDate =  startOfMonth(now); // First day of this month
      endDate =    toDate(now) // today
      break;

    case 'Last Month':
      startDate =  startOfMonth(subMonths(now, 1)); // First day of last month
      endDate =  lastDayOfMonth(subMonths(now, 1)); // Last day of last month
      break;

    case 'Last 3 Months':
      startDate = startOfMonth(subMonths(now, 3)); // First day of 3 months ago
      endDate =  endOfMonth(subMonths(now, 1)); // Last day of last month
      break;

    default:
      break;
  }

  return { startDate, endDate };
};

export const formatDateRange = (startDate:Date, endDate:Date) => {
  if (!startDate || !endDate) return "All Time"; // If there's no specific range, show "All Time"
  const formattedStart = format(startDate, 'dd MMMM'); // e.g., "01 January"
  const formattedEnd = format(endDate, 'dd MMMM'); // e.g., "31 January"
  return `${formattedStart} - ${formattedEnd}`;
};

// now I want last5Month data array object conains in amount: "10.00"
// ​​​
// category: "Food"
// ​​​
// date: "2024-09-15T18:30:00.000Z"
// ​​​
// description: "two Biscuits "
// ​​​
// expense_id: "cd94953c-51b2-4a93-9894-6b4a3661418a"
// ​​​
// id: 74
// ​​​
// title: "Breakfast" but I want in const barChartData = [
//   { month: "January", total_expense: 186 }, 

// ] this formate data there might be the case where last5monthdata does not contain some month data you have to set total_expense 0 for that month and create new array

interface Expense {
  amount: string;
  category: string;
  date: string;
  description: string;
  expense_id: string;
  id: number;
  title: string;
}

export const getBarChartData = (last5MonthData: Expense[]) => {

    // Define the months
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Initialize the bar chart data
    const barChartData = months.map((month) => ({ month, total_expense: 0 }));
   
    
    // Loop through the last 5 months of data
    last5MonthData.forEach((expense) => {
        const date = new Date(expense.date);
        const month = date.getMonth();
        const total_expense = Number(expense.amount);
    
        // Add the expense to the total for that month
        barChartData[month].total_expense += total_expense;
    });
    
    const currentMonth = new Date().getMonth();
    console.log(barChartData)

    const rearrangedData = [
    ...barChartData.slice(currentMonth - 4),
    ...barChartData.slice(0, currentMonth + 1)
  ];
  return rearrangedData.slice(-5);

    // return barChartData.slice((currentMonth - 5 + 12) % 12, currentMonth);
}

// Expense Calculator
export const expenseCategories = [
  "Housing",  
  "Transportation",
  "Food",
  "Utilities",
  "Entertainment",
  "Clothing",
  "Medical & Healthcare",
  "Household Items/Supplies",
  "Education",
  "Gifts",
  "Personal Spending",
  "Savings",
  "Other"
]

// Helper function to convert Excel date serial to JavaScript Date
export const excelDateToJSDate = (serial: number): string => {
  const utcDays = Math.floor(serial - 25569); // 25569 is the difference between 1900-01-01 and 1970-01-01
  const dateInfo = new Date(utcDays * 86400 * 1000); // Convert days to milliseconds
  return dateInfo.toISOString().split('T')[0]; // Return date in YYYY-MM-DD format
};

export const generatePagination = (totalPages: number, currentPage: number): (number | string)[] => {
    const pagination = [];
    const maxVisiblePages = 5; // Maximum number of page links to show

    let startPage = Math.max(2, currentPage - 2);
    let endPage = Math.min(totalPages - 1, currentPage + 2);

    // Add first page
    pagination.push(1);

    // Add ellipsis if needed
    if (startPage > 2) {
        pagination.push('...');
    }

    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
        pagination.push(i);
    }

    // Add ellipsis if needed
    if (endPage < totalPages - 1) {
        pagination.push('...');
    }

    // Add last page
    if (totalPages > 1) {
        pagination.push(totalPages);
    }

    return pagination;
};
