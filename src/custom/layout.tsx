import React from 'react'
import SideBar from './components/SideBar'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Tally1 } from 'lucide-react';
import { useRouter } from 'next/router';
const Layout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
      // Define the title based on the current pathname
  const getPageTitle = () => {
    switch (router.pathname) {
      case '/':
        return 'Dashboard';
      case '/expense':
        return 'Expense';
      case '/expense/bulkUpload':
        return 'Bulk Expense';
      case '/income':
        return 'Income';
      case '/transactions':
        return 'Transactions';
      case '/expense/forecasting':
        return 'Expense Forecast';
      default:
        return 'Dashboard'; // Default title
    }
  };

  return (
        <SidebarProvider>
    {/* <div  className='m-5 rounded-xl grid grid-cols-5 p-2 shadow-md border-blue-700 border-2 bg-muted/40'> */}
        <AppSidebar />

        <main className='px-8 py-4 col-span-4 rounded-xl w-full bg-muted/40'>
          <div className='flex items-center gap-2 mb-8 '>
          <SidebarTrigger /> <span className='text-zinc-200'>|</span> <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{getPageTitle()}</h4>
          </div>
          {children}
        </main>

    {/* </div> */}
        </SidebarProvider>
  )
}

export default Layout