"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal,ArrowUpDown  } from "lucide-react"
import { DataTableColumnHeader } from "./DataTableColumnHeader"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown"
import { Checkbox } from "@/components/ui/checkbox"
import { Pencil } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Expense = {
  id: string
  amount: number
  type:string
  category:string
  date:Date
}

export const columns: ColumnDef<Expense>[] = [
      {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
     },
   {
    id:"id",
    accessorKey: "id",
    header: "Transaction ID",
   }, 
  
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const variant = row.getValue("type")==='expense'?'secondary':'success';

      return <Badge  variant={variant}>{row.getValue("type")}</Badge>
    },
  },
  
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "date",
     header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Date" />
      )
    },
  },
  {
    accessorKey: "amount",
     header: () => <div className="text-right">Amount</div>,
     cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(amount)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
     enableGlobalFilter:false
  },
  {
    id: "actions",
    // cell: ({ row }) => {
    //   const expense = row.original
       
    //   return (
    //   <div className="flex gap-2">
    //       <Sheet>
    //         <SheetTrigger asChild>
    //         <Button  className="bg-primary hover:bg-primary/80 rounded-xl">
    //       <Pencil size={20} />
    //     </Button>
    //   </SheetTrigger>
    //   <SheetContent>
    //     <SheetHeader>
    //       <SheetTitle>Edit profile</SheetTitle>
    //       <SheetDescription>
    //         {expense.id}
    //       </SheetDescription>
    //     </SheetHeader>
    //   </SheetContent>
    //      </Sheet>
    //   </div>)
    // },
  },

]
