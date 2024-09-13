import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
import { toast } from "@/components/ui/use-toast"


const FormSchema = z.object({
  incomeTitle : z.string().min(3 , {message : 'Title must be atleast 3 characters long'}),
  incomeAmount : z.string(),
  date: z.string().date(),
  description: z.string().min(3 , {message : 'Description must be atleast 3 characters long'}),
})


export function index() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      incomeTitle: "",
      incomeAmount: "",
      date: new Date().toISOString(),
      description: ""
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
     toast({
          title: "Income Added",
        })
  }

  return (
    <div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="incomeTitle"
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
          name="incomeAmount"
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Notes
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Notes"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>

        
        <Button type="submit" className="bg-indigo-700 text-white hover:bg-slate-200 hover:text-black">
          Add Income
        </Button>
      </form>
    </Form>

    </div>
  )
}

export default index
