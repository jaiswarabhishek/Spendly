import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState ,useEffect} from "react"
import { IndianRupee } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"



// Expense Calculator
const expenseCategories = [
  "Housing",  
  "Transportation",
  "Food",
  "Utilities",
  "Entertainment",
  "Clothing",
  "Medical & Healthcare",
  "Household Items/Supplies",
  "Education",
  "Gifts",
  "Personal Spending",
  "Savings",
  "Other"
]

const FormSchema = z.object({
  category: z.string(),
  itemAmount: z.string()
})



export function Calculator() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const [totalExpense, setTotalExpense] = useState<{ category: string; itemAmount: string; }[]>([])
  const [categoryTotals, setCategoryTotals] = useState<{ category: string; itemAmount: string; }[]>([])




  function onSubmit(data: z.infer<typeof FormSchema>) {
    setTotalExpense([...totalExpense, data])
  }
  
   function calculateTotalExpense() {
    if (totalExpense.length > 0) {
      const lastExpense = totalExpense[totalExpense.length - 1];
      
      // Find if category already exists in categoryTotals
      const existingCategory = categoryTotals.find(item => item.category === lastExpense.category);
      
      if (existingCategory) {
        // Update the existing category total
        setCategoryTotals((prevTotals) =>
          prevTotals.map((item) =>
            item.category === lastExpense.category
              ? {
                  ...item,
                  itemAmount: (parseInt(item.itemAmount) + parseInt(lastExpense.itemAmount)).toString(),
                }
              : item
          )
        );
      } else {
        // Add a new category with the total
        setCategoryTotals((prevTotals) => [
          ...prevTotals,
          { category: lastExpense.category, itemAmount: lastExpense.itemAmount },
        ]);
      }
    }
  }

  // Effect to recalculate category totals whenever totalExpense changes
  useEffect(() => {
    calculateTotalExpense();
  }, [totalExpense]);


  return (
  <div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 mt-10 grid grid-cols-3 gap-4">
      
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {expenseCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="itemAmount"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter Amount" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-indigo-700 text-white hover:bg-slate-200 hover:text-black">Add</Button>
        {/* <Button type="button" onClick={()=> calculateTotalExpense()} className="bg-indigo-700 text-white hover:bg-slate-200 hover:text-black" >Calculate</Button> */}
      </form>
    </Form>

    <div>
      {
      categoryTotals.length > 0 &&
      <Card className="mt-10 w-2/3">
        <CardHeader>
          <CardTitle>Total Expenses</CardTitle>
        </CardHeader>
        <CardContent >
          {categoryTotals.map((item, index) => (
            <CardDescription key={index}>
              <div className="flex justify-between">
                <span className="text-md">{item.category}</span>
                <span className="flex items-center text-md"><IndianRupee className="w-3 h-3"/> {Number(item.itemAmount).toLocaleString()}</span>
              </div>
            </CardDescription>
          ))}
        </CardContent>

        <hr />
        <CardFooter>
          <div className="flex justify-between mt-2 w-full">
            <div>Total</div>
            <div className="flex items-center">
              <IndianRupee className="w-4 h-4"/> {categoryTotals.reduce((acc, item) => acc + parseInt(item.itemAmount), 0).toLocaleString()}
            </div>
          </div>
        </CardFooter>
      </Card>
      }
    </div>

  </div>
  )
}

export default Calculator
