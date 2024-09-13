import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Calculator from "@/custom/components/Calculator"
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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alertDialog"


import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"



const FormSchema = z.object({
  expenseTitle : z.string().min(3 , {message : 'Title must be atleast 3 characters long'}),
  expenseAmount : z.string(),
  date: z.string().date(),
  category: z.string().min(3 , {message : 'Category must be atleast 3 characters long'}),
  description: z.string().min(3 , {message : 'Description must be atleast 3 characters long'}),
})

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

export function index() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      expenseTitle: "",
      expenseAmount: "",
      date: new Date().toISOString(),
      category: "",
      description: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    //  toast({
    //       title: "Expense Added Successfully",
    //     })
  }

  return (
    <div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="expenseTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input   placeholder="Enter Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="expenseAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input placeholder="Enter Amount" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
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
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter Description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>

        <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="submit" className="bg-indigo-700 text-white hover:bg-slate-200 hover:text-black">
          Add Expense
        </Button>
        </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogDescription>
            
            <Card>
              <CardHeader>
                <CardTitle>Expense Details</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  <p>Title: {form.watch('expenseTitle')}</p>
                  <p>Amount: {form.watch('expenseAmount')}</p>
                  <p>Date: {form.watch('date')}</p>
                  <p>Category: {form.watch('category')}</p>
                  <p>Description: {form.watch('description')}</p>
                </CardDescription>
              </CardContent>
            </Card>

          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="w-2/3 ml-auto">
          <AlertDialogCancel className="w-1/2">
            Edit
          </AlertDialogCancel>
          <AlertDialogAction className="w-1/2 bg-indigo-700 ">
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
      </form>
    </Form>

    
      <Card className="mt-10">
        <CardHeader>
          <CardTitle>Expense Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <Calculator />
        </CardContent>
        <CardFooter>
          <CardDescription>
              Calculate your expenses and manage your budget with our expense
              calculator.
          </CardDescription>
        </CardFooter>
      </Card>
    

    </div>
  )
}

export default index
