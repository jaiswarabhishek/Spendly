"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table"
import { Pencil } from 'lucide-react';
import { FetchTransactionData } from "@/data/FetchTransactionData";
import { CopyButton } from "@/components/ui/copy-button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown"
import { Input } from "@/components/ui/input"
import { DataTablePagination } from "./DataTablePagination"
import { DataTableViewOptions } from "./DataTableViewOptions"
import { DataTableDelete } from "./DataTableDelete";
import { DataTableExport } from "./DataTableExport";
import { Textarea } from "@/components/ui/textarea";
import { DatePickerWithRange } from "@/custom/components/DateRangePicker"
import Loader from "../Loader";


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

interface GlobalFilter {
  globalFilter: any
}

export function DataTable<TData  extends { id: string }, TValue>({
  columns,
  data,
}: DataTableProps<TData , TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [transactionData,setTransactionData] = React.useState([{id:'',description:'',title:'',amount:'',date:''}]);
  const [loader ,setLoader] = React.useState(false);
  
  


  const[filtering,setFiltering] = React.useState("");

  const getTransactionData:any=async(transaction_id:string)=>{
       try{
        setLoader(true)
        const response =await fetch(`/api/transactions/singletransaction/${transaction_id}`)
        const result = await response.json();
        console.log(result)
        setTransactionData(result.data)
        setLoader(false)
       }catch(error){
          console.error('Error fetching data:', error);
       }
  }

  const [globalFilter, setGlobalFilter] = React.useState<any>([])
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
     const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getRowId:(transaction)=>transaction.id,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter:filtering,
    },
    onGlobalFilterChange: setFiltering
  })

  const isSelected = table.getSelectedRowModel().rows.length > 0 ? true : false ;
  

  return (
    <div>
        <div className="flex justify-between items-center py-4">
        <div className="flex gap-4 w-2/3">
        <Input
         placeholder="Filter ID, Category, Type, Date...."
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
          className=" max-w-sm "
        />
        <DatePickerWithRange />
        </div>

        <div className="flex gap-4">

       {isSelected && <DataTableExport table={table} />}
       {isSelected && <DataTableDelete table={table} />}
       <DataTableViewOptions table={table} />

       </div>

      </div>
    <div className="rounded-xl bg-white border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => {

                 return  <>
                { cell.column.id==='actions'?
                 <TableCell key={cell.id}>
                    <div className="flex gap-2">
                      <Sheet>
            <SheetTrigger asChild>
            <Button onClick={()=>getTransactionData(row.original.id)}  className="bg-primary hover:bg-primary/80 rounded-xl">
          <Pencil size={20} />
        </Button>
      </SheetTrigger>
       <SheetContent  >
        <SheetHeader>
          <Card className="mt-10">
          <CardHeader>
            <CardTitle>Edit Transactions</CardTitle>
            <CardDescription>
              Make changes to your transactions here. Click save when you&apos;re done.
            </CardDescription>
          </CardHeader>
           { loader?<Loader/>:<CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={transactionData[0].title} />
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" value={transactionData[0].amount} />
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="date">Date</Label>
              <Input id="date" value={new Date(transactionData[0].date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).split('/').reverse().join('-')} />
            </div>

            <div className="space-y-1">
              <Label htmlFor="description">Description</Label>
               <Textarea id="description" className="resize-none" value={transactionData[0].description} />
              {/* <Input id="description" value={transactionData[0].description} /> */}
            </div>
          </CardContent> }
          <CardFooter className="w-full flex gap-4">
            <Button className="bg-primary text-popover hover:bg-primary/80 w-full">Save changes</Button>
          </CardFooter>
          </Card>
         
        </SheetHeader>
       </SheetContent>
                     </Sheet>
                   </div>
                  </TableCell>
                  : 
                  cell.column.id==='id'?
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())} <CopyButton value={ cell.getValue() as string } />
                  </TableCell>
                  :
                   <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                } 
                </>
              })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    
    <div className="mt-4">
         <DataTablePagination table={table} />
      </div>
    </div>
  )
}
