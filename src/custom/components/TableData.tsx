import React,{useState,useMemo} from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter
} from "@/components/ui/table"

import { Button } from '@/components/ui/button'
import { IndianRupee } from 'lucide-react'
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { Loader2 } from 'lucide-react'
import { generatePagination } from '@/data/Utils'
import { ScrollArea } from "@/components/ui/scrollArea"
import { Pencil  } from 'lucide-react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { expenseCategories } from '@/data/Utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// title","total_amount","date","category","description"
interface ExpenseData {
  title:string;
  total_amount:number;
  date:string;
  category:string;
  description:string
}

interface ExpenseListProps {
  expenseData: ExpenseData[];
}


const TableData: React.FC<ExpenseListProps> = ({ expenseData }) => {
  console.log(expenseData)


const [loader,setLoader] = useState<boolean>(false);
const [ok,setOk] = useState<boolean>(false);
const [currentPage, setCurrentPage] = useState<number>(1);
const [editData,setEditData] = useState<ExpenseData>({
  title:'',
  date:'',
  total_amount:0,
  description:'',
  category:''
});


const [finalData, setFinalData] = useState(() => {
 const aggregated: { [key: string]: ExpenseData } = {};
  expenseData.forEach(expense => {
    const key = `${expense.category}`;
    if (aggregated[key]) {
      aggregated[key].total_amount += expense.total_amount;
      aggregated[key].description += `, ${expense.description}`;
    } else {
      aggregated[key] = { ...expense };
    }
  });
  return Object.values(aggregated);
});


  const total_expense_amount = useMemo(() => {
    return finalData.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.total_amount;
    }, 0);
  }, [finalData]); // Recompute only when finalData changes

   const handleEditClick = (idx:number)=>{
     const data = finalData.filter((expense,index)=>idx===index)
     setEditData({
      title:data[0].title,
      total_amount:data[0].total_amount,
      category:data[0].category,
      description:data[0].description,
      date:data[0].date
     })
 }

  // Handle input changes for all fields
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditData({
      ...editData,
      [name]: name === 'total_amount' ? isNaN(parseFloat(value)) ?'':parseFloat(value) : value,
    });
  };

  const handleEditSave = (idx:number) => {
       // Update the finalData state
  setFinalData((prevData) => {
    return prevData.map((item, index) => {
      if (index === idx) { // Adjust according to your unique identifier
        return editData; // Return the updated selectedExpense
      }
      return item; // Keep the rest the same
    });
  });
  };
 



  // Calculate total pages
  const itemsPerPage = 4;
  const totalPages = Math.ceil(finalData.length / itemsPerPage);

    // Get current page items
  const currentItems = finalData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const pages = generatePagination(totalPages, currentPage);

  // Handle next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // Handle previous page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Handle page click
  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };
  
  const handleSubmit = async (expenses: ExpenseData[]) => {
    setLoader(true);
    const response = await fetch('/api/expenses/bulkUpload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expenses),
    });
    setLoader(false)

    if (response.ok) {
      setOk(true);
         toast({
        variant: "success",
        title: "Expense Data",
        description: "Your expense has been successfully saved",
      })
    }
    else{
      setOk(false);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: response.statusText,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
    }

 };



  return (
    <div>
    <Table className="min-w-full">
      <TableCaption>

     <div className='my-2'>
          <Pagination>
      <PaginationContent>
        <PaginationItem className=' cursor-pointer '>
          <PaginationPrevious onClick={handlePrevPage} />
        </PaginationItem>


           {pages.map((page, index) => (
                    <div key={index} >
                        {page === '...' ? (
         <PaginationItem key={index}>
          <PaginationEllipsis />
        </PaginationItem> 
                        ) : (
                            <PaginationItem key={index} className='mx-2'>
          <PaginationLink onClick={() => handlePageClick(Number(page))}  className={`px-3 py-1 cursor-pointer ${
              currentPage === page ? 'font-bold bg-primary text-popover' : 'bg-gray-200 hover:bg-gray-300'
            }`}>
              {page}
            </PaginationLink>
        </PaginationItem>
                        )}
                    </div>
              ))}


        <PaginationItem className='cursor-pointer'>
          <PaginationNext  onClick={handleNextPage}/>
        </PaginationItem>

      </PaginationContent>
    </Pagination>
        </div>

        <Button disabled={ok} onClick={()=>handleSubmit(finalData)} className='bg-primary text-popover hover:bg-primary w-1/2 mx-auto mt-2'>
         { loader ? <Loader2 className='animate-spin' size={25}/> : "Add Expense" }
        </Button>
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Date</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="overflow-y-auto overflow-x-hidden">
        {currentItems.map((invoice,index) => (
          <TableRow  key={index}>
            <TableCell className="font-medium">{invoice.date}</TableCell>
            <TableCell>{invoice.category}</TableCell>
            <TableCell>{invoice.description}</TableCell>
            <TableCell className="text-right flex items-center"><IndianRupee size={12} className='ml-2' /> {invoice.total_amount.toLocaleString()}</TableCell>
            <TableCell className='text-right' >
            <Dialog>
      <DialogTrigger  asChild>
        <Button className='cursor-pointer rounded-xl' onClick={()=>handleEditClick(index)}><Pencil  size={20} /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Expense Details</DialogTitle>
          <DialogDescription>
            Make changes to your expense here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              value={editData.title}
              className="col-span-3"
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
              <Select name='category' value={editData.category} onValueChange={(value)=>setEditData({...editData,category:value})} >
                  <SelectTrigger  className="col-span-3">
                    <SelectValue placeholder="Select Category"  />
                  </SelectTrigger>
                <SelectContent>
                  {expenseCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
          </div>

           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date
            </Label>

                        <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal col-span-3 rounded-xl",
            !new Date(editData.date as unknown as Date) && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {editData.date ? format(new Date(editData.date), 'yyyy-MM-dd') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={new Date(editData.date)}
          defaultMonth={new Date(editData.date)}
          onSelect={(value)=>setEditData({...editData,date:format(new Date(value? value:'' ), 'yyyy-MM-dd') || "Invalid Date"})}
          initialFocus
          
        />
      </PopoverContent>
    </Popover>
          </div>  
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              name="description"
              value={editData.description}
              className="col-span-3"
              onChange={handleInputChange}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="total_amount" className="text-right">
              Amount
            </Label>
            <Input
              id="amount"
              name="total_amount"
              defaultValue={0}
              value={editData.total_amount}
              className="col-span-3"
              onChange={handleInputChange}
            />
          </div>

        </div>
        <DialogFooter>
          <DialogClose asChild>
          <Button type="submit" onClick={()=>handleEditSave(index)}  >Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
            </Dialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right flex items-center">
            <IndianRupee size={12} className='ml-2' />
            {total_expense_amount.toLocaleString()}
          </TableCell>
        </TableRow>
        
      </TableFooter>
      
    </Table>

    </div>
  )
}

export default TableData