import React from 'react'
import { Mail, ChartAreaIcon , ChartPie ,ArrowLeftRight , IndianRupee , Wallet, Calculator ,Activity ,Repeat  } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/router'


const sampleMenuData = [
    {
        lable:'Analytics',
        icon:Activity ,
        href:'/'
    },
    {
        lable:'Expense',
        icon:IndianRupee,
        href:'/expense'
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
    }
    // {
    //     lable:'Calculator',
    //     icon:Calculator,
    //     href:'/expense/calculator'
    // }
]

const SideBar = () => {
     const router = useRouter()

  return (
    <div className={`bg-white border-2  m-2 col-span-1 rounded-xl h-screen shadow-sm `}>
        <div className='flex flex-col items-center gap-8 justify-center  mt-10'>
            {
                sampleMenuData.map((item,index)=>(
                    <Button key={index} className={`w-2/3  hover:bg-indigo-700 hover:text-white ${router.pathname === item.href ? 'bg-indigo-700 text-white' : ''} `} variant="secondary" onClick={() => router.push(item.href)}>
                        <item.icon className="mr-2 h-4 w-4" /> {item.lable}
                    </Button>
                ))
            }
        </div>
    </div>
  )
}

export default SideBar