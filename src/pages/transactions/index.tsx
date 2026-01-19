
import { Expense,columns  } from "@/custom/components/transactions/columns"
import { DataTable } from "@/custom/components/transactions/data-table"
import { FetchTableData } from "@/data/FetchTableData"
import {format,startOfMonth,lastDayOfMonth,subMonths,endOfMonth} from 'date-fns'
import Image from "next/image"
import Loader from "@/custom/components/Loader"

export default function  index() {
   
    const {transactionData,error} = FetchTableData();

    if (error || transactionData?.error) return <div className="h-full flex flex-col justify-center items-center">
    <Image height={350} width={350} src="/error_expense.png" alt="Failed To Load Data" className="mx-auto" />
      <div className="text-center mt-10">
      <h2 className="text-2xl font-semibold text-red-700">Oops! Something went wrong.</h2>
      <p className="text-gray-600 mt-2">We couldn&apos;t load the transactions. Please try again later.</p>
    </div>
    </div>

    if (!transactionData) return <Loader />

    if(transactionData.data.length===0) return  <div className="h-full flex flex-col justify-center items-center">
    <Image height={350} width={350} src="/empty.png" alt="Failed To Load Data" className="mx-auto" />
      <h2 className="text-xl font-semibold text-gray-700">No Expenses or Income Recorded</h2>
      <p className="text-gray-500 mt-2">It looks like you haven&apos;t added any expenses or income yet. Start by adding your first transaction!</p>
    </div>

const data: Expense[] = transactionData.data.map((transaction: Expense, index: number) => {
  return {
    ...transaction,
    date: new Date(transaction.date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).split('/').reverse().join('-')  // Format to YYYY-MM-DD
  };
});

  
//   const data: Expense[] = [
//   {
//     id: "m5gr84i9",
//     amount: 316,
//     status: "success",
//     email: "ken99@yahoo.com",
//   },
//   {
//     id: "3u1reuv4",
//     amount: 242,
//     status: "success",
//     email: "Abe45@gmail.com",
//   },
//   {
//     id: "derv1ws0",
//     amount: 837,
//     status: "processing",
//     email: "Monserrat44@gmail.com",
//   },
//   {
//     id: "5kma53ae",
//     amount: 874,
//     status: "success",
//     email: "Silas22@gmail.com",
//   },
//   {
//     id: "bhqecj4p",
//     amount: 721,
//     status: "failed",
//     email: "carmella@hotmail.com",
//   },
//   {
//     id: "bhqecj4p",
//     amount: 721,
//     status: "failed",
//     email: "carmella@hotmail.com",
//   },{
//     id: "bhqecj4p",
//     amount: 721,
//     status: "failed",
//     email: "carmella@hotmail.com",
//   },{
//     id: "bhqecj4p",
//     amount: 721,
//     status: "failed",
//     email: "carmella@hotmail.com",
//   },{
//     id: "bhqecj4p",
//     amount: 721,
//     status: "failed",
//     email: "carmella@hotmail.com",
//   },{
//     id: "bhqecj4p",
//     amount: 721,
//     status: "failed",
//     email: "carmella@hotmail.com",
//   },{
//     id: "bhqecj4p",
//     amount: 721,
//     status: "failed",
//     email: "carmella@hotmail.com",
//   },{
//     id: "bhqecj4p",
//     amount: 721,
//     status: "failed",
//     email: "carmella@hotmail.com",
//   },
// ]

// type,id,amount,category,date
  return (
    <div className="container px-0 pb-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
