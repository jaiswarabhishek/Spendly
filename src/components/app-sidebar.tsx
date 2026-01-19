import { Mail, ChartAreaIcon , ChartPie ,ArrowLeftRight , IndianRupee , Wallet, Calculator ,Activity ,Repeat ,Upload,Sprout ,LayoutDashboard   } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { DateContext } from '@/context/DateRangeContext'
import { useEffect } from 'react'
import { Button } from "@/components/ui/button"
const items = [
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


export function AppSidebar() {
      const router = useRouter()

      const value = useContext(DateContext);
    if (!value) {
        throw new Error('useUserContext must be used within a DateContextProvider');
    }
    
    const {setDate} = value;

    useEffect(()=>{
         setDate(undefined)
    },[router,setDate])

  return (
    <Sidebar collapsible="icon" >
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupLabel>Spendly - Expense Tracker</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2 mt-2">
              {items.map((item) => (
                <SidebarMenuItem  key={item.lable}>
                  <SidebarMenuButton tooltip={item.lable}  asChild className={`py-5 px-4 cursor-pointer   ${router.pathname === item.href ? 'bg-primary text-popover' : ''} `}  onClick={() => router.push(item.href)}>
                    <div >
                      <item.icon/>
                      <span>{item.lable}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
