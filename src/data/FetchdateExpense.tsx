import useSWR from 'swr'
import {format,startOfMonth,lastDayOfMonth,subMonths,endOfMonth} from 'date-fns'

const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then((res) => res.json())
import { DateContext } from "@/context/DateRangeContext"
import { useContext } from "react"

export const FetchDateExpense = (select: string) => {
    let startDate = ''
    let endDate = ''

     const value = useContext(DateContext);
    if (!value) {
        throw new Error('useUserContext must be used within a DateContextProvider');
    }
    


  if(select === 'Last Month'){
    startDate = format(startOfMonth(subMonths(new Date(), 1)), 'yyyy-MM-dd')
    endDate = format(endOfMonth(subMonths(new Date(), 1)), 'yyyy-MM-dd')
  }
  else if (select === 'Last 3 Months'){
    startDate = format(startOfMonth(subMonths(new Date(), 3)), 'yyyy-MM-dd')
    endDate = format(endOfMonth(subMonths(new Date(), 1)), 'yyyy-MM-dd')
  }

  else if(select === 'This Month'){
    startDate = format(startOfMonth(new Date()), 'yyyy-MM-dd')
    endDate = format(lastDayOfMonth(new Date()), 'yyyy-MM-dd')
  }

  else {
    const {date} = value;
   

    if(date?.from && date?.to){
      startDate = format(new Date(date?.from),'yyyy-MM-dd')
      endDate = format(new Date(date?.to),'yyyy-MM-dd');
    }
    else{
    startDate = format(startOfMonth(new Date()), 'yyyy-MM-dd')
    endDate = format(lastDayOfMonth(new Date()), 'yyyy-MM-dd')
    }

    console.log(startDate, endDate)
  }
  console.log( format(startOfMonth(subMonths(new Date(), 3)), 'yyyy-MM-dd') ,format(endOfMonth(subMonths(new Date(), 1)), 'yyyy-MM-dd') )

  
  const { data:expenseData , error} = useSWR(`/api/analytics/expenses?startDate=${startDate}&endDate=${endDate}`, fetcher)

 
return {
    expenseData,
    error
}
}

export const FetchLast5MonthsExpense = () => {
  const { data:fiveMonthdata, error:fiveMonthExpenseError} = useSWR(`/api/analytics/last5monthExpense`, fetcher)
 
  return {
    fiveMonthdata,
    fiveMonthExpenseError
  }
}

export const FetchIncome = (select: string) => {
  let startDate = ''
  let endDate = ''

    const value = useContext(DateContext);
    if (!value) {
        throw new Error('useUserContext must be used within a DateContextProvider');
    }

 if(select === 'Last Month'){
    startDate = format(startOfMonth(subMonths(new Date(), 1)), 'yyyy-MM-dd')
    endDate = format(endOfMonth(subMonths(new Date(), 1)), 'yyyy-MM-dd')
  }
  else if (select === 'Last 3 Months'){
    startDate = format(startOfMonth(subMonths(new Date(), 3)), 'yyyy-MM-dd')
    endDate = format(endOfMonth(subMonths(new Date(), 1)), 'yyyy-MM-dd')
  }
  
  else if(select === 'This Month'){
    startDate = format(startOfMonth(new Date()), 'yyyy-MM-dd')
    endDate = format(lastDayOfMonth(new Date()), 'yyyy-MM-dd')
  }

  else {
    const {date} = value;
   

    if(date?.from && date?.to){
      startDate = format(new Date(date?.from),'yyyy-MM-dd')
      endDate = format(new Date(date?.to),'yyyy-MM-dd');
    }
    else{
    startDate = format(startOfMonth(new Date()), 'yyyy-MM-dd')
    endDate = format(lastDayOfMonth(new Date()), 'yyyy-MM-dd')
    }

    console.log(startDate, endDate)
  }

const { data:incomeData , error:incomeError} = useSWR(`/api/analytics/incomes?startDate=${startDate}&endDate=${endDate}`, fetcher)

return {
  incomeData,
  incomeError
}
}

