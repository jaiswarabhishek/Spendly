import React from 'react'
import { Mail, ChartAreaIcon , ChartPie ,ArrowLeftRight , IndianRupee , Wallet, Calculator ,Activity ,Repeat ,Upload,Sprout ,LayoutDashboard   } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { DateContext } from '@/context/DateRangeContext'
import { useEffect } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const sampleMenuData = [
    {
        lable:'Dashboard',
        icon:LayoutDashboard  ,
        href:'/'
    },
    {
        lable:'Expense',
        icon:IndianRupee,
        href:'/expense'
    },
    {
        lable:'Bulk Expense',
        icon:Upload,
        href:'/expense/bulkUpload'
    },
    {
        lable:'Income',
        icon:Wallet,
        href:'/income'
    },
    {
        lable:'Transactions',
        icon:Repeat ,
        href:'/transactions'
    },
    {
        lable:'Expense Forecast',
        icon:Sprout,
        href:'/expense/forecasting'
    }
]

const SideBar = () => {
     const router = useRouter()

      const value = useContext(DateContext);
    if (!value) {
        throw new Error('useUserContext must be used within a DateContextProvider');
    }
    
    const {setDate} = value;

    useEffect(()=>{
         setDate(undefined)
    },[router])

   
  return (
    <Card className='mr-4'>
    <div className={`h-screen`}>
        <div className='flex flex-col items-center gap-8 justify-center  mt-10'>
            {
                sampleMenuData.map((item,index)=>(
                    <Button key={index} className={`w-2/3  hover:bg-primary hover:text-popover ${router.pathname === item.href ? 'bg-primary text-popover' : ''} `} variant="secondary" onClick={() => router.push(item.href)}>
                        <item.icon className="mr-2 h-4 w-4" /> {item.lable}
                    </Button>
                ))
            }
        </div>
    </div>
    </Card>
  )
}

export default SideBar