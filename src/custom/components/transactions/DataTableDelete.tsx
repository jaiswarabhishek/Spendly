"use client"

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { MixerHorizontalIcon,DownloadIcon} from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Trash2  } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { FetchTableData } from "@/data/FetchTableData"
import useSWR from "swr"


interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
}

export function DataTableDelete<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {

   const {mutate} = FetchTableData();

    const transactions = table.getSelectedRowModel().rows.map((item)=>{
        return {id:item._valuesCache.id, type:item._valuesCache.type}
    })
   

    const deleteTransactions = async () => {
    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transactions }), // Send transactions in the body
      });

      mutate()

      if (response.ok) {
        toast({
        variant: "success",
        title: "Transaction Deleted!",
        description: "Selected transactions has been deleted successfully.",
      })
      }
      else{
          toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: response.statusText,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      }
    } catch (error) {
      console.error('Failed to delete transactions:', error);
    }
    };

 
  return (
        <Button
          variant="destructive"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
          onClick={deleteTransactions}
        >
          <Trash2  className="mr-2 h-4 w-4" />
          Delete Transactions
        </Button>
  )
}
