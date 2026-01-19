
import * as React from "react"
import useSWR from 'swr'
import { Bar, BarChart, CartesianGrid, XAxis , Label, Pie, PieChart ,YAxis,LabelList} from "recharts"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { FetchDateExpense, FetchLast5MonthsExpense,FetchIncome } from "@/data/FetchdateExpense"
import { getDateRange,formatDateRange,getBarChartData } from "@/data/Utils"
import { getYear, getMonth, subMonths } from 'date-fns';
import Loader from "@/custom/components/Loader"
import Image from "next/image"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import { Wallet , IndianRupee , Landmark , TrendingUp, AlertCircle ,Percent } from 'lucide-react';
import SetGoal from "@/custom/components/SetGoal"
import { DatePickerWithRange } from "@/custom/components/DateRangePicker"


const chartConfig = {
  views: {
    label: "Page Views",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
   visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  'Household Items/Supplies': {
    label: "Household Items/Supplies",
    color: "hsl(var(--chart-4))",
  },
  amount: {
    label: "Amount",
    color: "hsl(var(--chart-1))",
  },
 housing: {
    label: "Housing",
    color: "hsl(var(--chart-1))",
  },
  transportation: {
    label: "Transportation",
    color: "hsl(var(--chart-2))",
  },
  food: {
    label: "Food",
    color: "hsl(var(--chart-3))",
  },
  utilities: {
    label: "Utilities",
    color: "hsl(var(--chart-4))",
  },
  entertainment: {
    label: "Entertainment",
    color: "hsl(var(--chart-5))",
  },
  clothing: {
    label: "Clothing",
    color: "hsl(var(--chart-6))",
  },
  health: {
    label: "Medical & Healthcare",
    color: "hsl(var(--chart-7))",
  },
  household: {
    label: "Household Items/Supplies",
    color: "hsl(var(--chart-8))",
  },
  education: {
    label: "Education",
    color: "hsl(var(--chart-9))",
  },
  pets: {
    label: "Pets",
    color: "hsl(var(--chart-10))",
  },
  insurance: {
    label: "Insurance",
    color: "hsl(var(--chart-11))",
  },
  charity: {
    label: "Charity",
    color: "hsl(var(--chart-12))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-13))",
  },
} satisfies ChartConfig


const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then((res) => res.json())

export default function Home() {

    const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("amount")

    const [select, setSelect] = React.useState('This Month');




  const selectDurationCategories = ["All", "This Month" , "Last Month" , "Last 3 Months" , "Custom Range"]

 // extract data from the fetchDateExpense hook

  const { expenseData, error} = FetchDateExpense(select)
  const { fiveMonthdata, fiveMonthExpenseError} = FetchLast5MonthsExpense();
  const { incomeData, incomeError} = FetchIncome(select)
 console.log(incomeData)
  

   if(error || fiveMonthExpenseError || incomeError || fiveMonthdata?.error || incomeData?.error || expenseData?.error) return <div className="h-full flex flex-col justify-center items-center">
    <Image height={350} width={350} src="/error_expense.png" alt="Failed To Load Data" className="mx-auto" />
      <div className="text-center mt-10">
      <h2 className="text-2xl font-semibold text-red-700">Oops! Something went wrong.</h2>
      <p className="text-gray-600 mt-2">We couldn&apos;t load the data. Please try again later.</p>
    </div>
    </div>
    
  if(!expenseData || !fiveMonthdata || !incomeData) return <Loader />

  // if(expenseData.data.length===0) return  <div className="h-full flex flex-col justify-center items-center">
  //   <Image height={350} width={350} src="/empty.png" alt="Failed To Load Data" className="mx-auto" />
  //     <h2 className="text-xl font-semibold text-gray-700">No Expenses or Income Recorded</h2>
  //     <p className="text-gray-500 mt-2">It looks like you haven&apos;t added any expenses or income yet. Start by adding your first transaction!</p>
  //   </div>

  const total_income =  incomeData.data === null ? 0:parseFloat(incomeData.data)
  console.log(total_income)


  console.log(fiveMonthdata)

  const barChartData = getBarChartData(fiveMonthdata.data)


  console.log("last5Month",barChartData)

  const fifthMonth = barChartData[0].month
  const lastMonth = barChartData[4].month
  const maxMonth = barChartData.reduce((acc, curr) => (curr.total_expense > acc.total_expense ? curr : acc),{
    month: "",
    total_expense: 0,
  });
  const minMonth = barChartData.reduce((acc, curr) => (curr.total_expense < acc.total_expense ? curr : acc),{
    month: "",
    total_expense: Math.max(...barChartData.map((item) => item.total_expense)),
  });



  // now create pie chart data from the fetched data having categories as date and amount as value and add all amount have same category and sum_amount in number type in the form of percentage

  // Function to create pie chart data
function createPieChartData(expenseData: any[]): any[] {
  const categoryTotals: { [key: string]: number } = {};

  // Step 1: Sum up amounts for each category
  expenseData.forEach((expense) => {
    const amount = parseFloat(expense.amount); // Convert amount to number
    const category = expense.category;

    if (categoryTotals[category]) {
      categoryTotals[category] += amount;
    } else {
      categoryTotals[category] = amount;
    }
  });

  // Step 2: Calculate the total sum of all categories
  const totalSum = Object.values(categoryTotals).reduce((acc, curr) => acc + curr, 0);

  // Step 3: Calculate the percentage of each category's total amount and add the 'fill' field
  const pieChartData = Object.keys(categoryTotals).map((category) => {
    const totalAmount = categoryTotals[category];
    const totalAmountPercentage = ((totalAmount / totalSum) * 100).toFixed(2); // Calculate percentage and round to 2 decimal places
    const fill = `var(--color-${category.toLowerCase()})`; // Create the fill field dynamically

    return {
      category,
      total_amount_percentage: Number(totalAmountPercentage), // Convert percentage to number type
      fill, // Add the fill field
    };
  });

  return pieChartData;
}

// Call the function
const pieChartData = createPieChartData(expenseData.data);
console.log(pieChartData)

// sort pieCharData
pieChartData.sort(
    (p1, p2) => 
    (p1.total_amount_percentage < p2.total_amount_percentage) ? 1 : (p1.total_amount_percentage > p2.total_amount_percentage) ? -1 : 0);

const maxSpendingCategory = pieChartData[0]

const minSpendingCategory = pieChartData[pieChartData.length - 1]


const { startDate, endDate } = getDateRange(select);
const dateRangeText = startDate && endDate ? formatDateRange(startDate, endDate) : "Invalid Date Range";





  // console.log(expenseData.data)
 
 // Function to convert UTC to Indian Standard Time (IST) and format as YYYY-MM-DD

  function convertUTCtoIST(utcDate: string) {
    const indDate= new Date(utcDate).toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })

    // format as YYYY-MM-DD
    const [month, day, year] = indDate.split("/")
    return `${year}-${month}-${day}`
  }

  function getAllDatesInMonth(year: number, month: number) {
    const dates = [];
    const date = new Date(year, month - 1, 1); // JS months are 0-based

    while (date.getMonth() === month - 1) {
        const day = date.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${(month).toString().padStart(2, '0')}-${day}`;
        dates.push(formattedDate);
        date.setDate(date.getDate() + 1); // Move to the next day
    }

    return dates;
}

  // Group and sum expenses by date
  const groupedExpenses = expenseData.data.reduce((acc: Record<string, number>, curr: any) => {
    const date = convertUTCtoIST(curr.date)
    acc[date] = (acc[date] || 0) + parseFloat(curr.amount)

    if(select === 'This Month'){
      getAllDatesInMonth(getYear(new Date()),getMonth(new Date()) + 1).forEach((date) => {
        if (!acc[date]) {
          acc[date] = 0
        }
      } )
    }
    else if(select === 'Last Month'){
      getAllDatesInMonth(getYear(subMonths(new Date(), 1)),getMonth(subMonths(new Date(), 1)) + 1).forEach((date) => {
        if (!acc[date]) {
          acc[date] = 0
        }
      } )
    }

    return acc
  }, {})

  // Convert grouped expenses to chart data format 
  const chartData = Object.keys(groupedExpenses).map((date) => ({
    date,
    amount: groupedExpenses[date],
  }))

  // Sort chart data by date
  chartData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  console.log(chartData)

  const total_expense = chartData.reduce((acc, curr) => acc + curr.amount, 0)
  
  const topCardsData = [
  {
    title: 'Total Income',
    icon: Wallet,
    description: 'Total Income',
    value: total_income,
    color: 'text-green-700',
    iconColor: 'green'
  },
  {
    title: 'Total Expense',
    icon: IndianRupee,
    description: 'Total Expense',
    value: total_expense,
    color: 'text-red-700',
    iconColor: 'red'
  },
  {
    title: 'Total Balance',
    icon: Landmark,
    description: 'Total Balance',
    value: total_income - total_expense,
    color: 'text-indigo-800',
    iconColor: '#4338ca'
  },
]


  return (
  <div>
   
    <div className="flex justify-between">
    <div className="flex gap-4">

    <Select value={select} onValueChange={(value) => setSelect(value)}>
       <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Duration" />
      </SelectTrigger>
                  <SelectContent>{selectDurationCategories.map((category) => (<SelectItem key={category} value={category}>{category}</SelectItem>))}</SelectContent>
    </Select>

   { select==='Custom Range' && <DatePickerWithRange /> }
    </div>
    
    <SetGoal />
    </div>
   
   { 
    expenseData.data.length===0 ?<div className="h-full flex flex-col justify-center items-center mt-20">
    <Image height={250} width={250} src="/empty.png" alt="Failed To Load Data" className="mx-auto" />
      <h2 className="text-xl font-semibold text-gray-700">No Expenses or Income Recorded</h2>
    </div>:
    <>
    <div className='grid grid-cols-3 gap-4 mt-4'>
      {
        topCardsData.map((item,index)=>(
          <Card key={index}>
            <CardHeader>
              <item.icon className="h-8 w-8"  />
            </CardHeader>
            <CardContent>
              <CardTitle className="text-md ">{item.title}</CardTitle>
            </CardContent>
            <CardFooter className={`text-[2rem] font-bold ${item.color}`}>
             <IndianRupee className="w-7 h-7" />  {  parseInt(item.value.toString(), 10).toLocaleString()}
            </CardFooter>
          </Card>
        ))
      }
    </div>

    <div className="mt-4">
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>
            {select} Expenses
          </CardTitle>
        </div>
       
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false}  />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-IN", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="amount"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-IN", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                  indicator="line"
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} radius={2} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
    </div>

   <div className="mt-4 grid grid-cols-2 gap-4">
      
      <div>
        <Card>
      <CardHeader>
        <CardTitle> Last 5 Months Expenses</CardTitle>
        <CardDescription>{fifthMonth} - {lastMonth}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[202px]">
          <BarChart
            accessibilityLayer
            data={barChartData}
            layout="vertical"
            margin={{
              right: 50,
            }}
            
          >
            <XAxis type="number" dataKey="total_expense" hide />
   
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="total_expense" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="total_expense" fill="var(--color-desktop)" radius={5} >
              <LabelList
                dataKey="month"
                position="insideLeft"
                offset={8}
                className="fill-[white]"
                fontSize={12}
              />
              <LabelList
                dataKey="total_expense"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
              </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none">
          <h6 className="scroll-m-20 text-md font-semibold tracking-tight text-red-700 flex items-center">
          {maxMonth.month} had the highest expense of  <IndianRupee className="w-3 h-3 ml-1" />
          {maxMonth.total_expense.toLocaleString()}
          </h6>
        </div>
        <div className="leading-none">
          <h6 className="scroll-m-20 text-md font-semibold tracking-tight text-green-700 flex items-center">
          {minMonth.month} had the lowest expense of  <IndianRupee className="w-3 h-3 ml-1" />
          {minMonth.total_expense.toLocaleString()}
          </h6>
        </div>
      </CardFooter>
    </Card>
      </div>

     <div>
       <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Expense Overview</CardTitle>
        <CardDescription>
          {dateRangeText}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel  indicator="line" className="percentage"  />}
            />
            <Pie
              data={pieChartData}
              dataKey="total_amount_percentage"
              
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {total_expense.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Expense
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          <h6 className="scroll-m-20 text-md font-semibold tracking-tight text-red-700 flex items-center">
           Maximum spending category is {maxSpendingCategory.category} {maxSpendingCategory.total_amount_percentage}%
          </h6>
        </div>
        <div className="leading-none">
          <h6 className="scroll-m-20 text-md font-semibold tracking-tight text-green-700 flex items-center">
           Minimum spending category is {minSpendingCategory.category} {minSpendingCategory.total_amount_percentage}%
          </h6>
        </div>
      </CardFooter>
      </Card>
     </div>

   </div>
</>}

  </div>  
  );
}
