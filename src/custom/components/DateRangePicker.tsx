"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { useContext } from "react"
import { DateContext } from "@/context/DateRangeContext"
import { DateContextProvider } from "@/context/DateRangeContext"

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {

  
  // const {date,setDate} = useContext(DateContext);

  // const [date, setDate] = React.useState<DateRange | undefined>({
  //   from: undefined,
  //   to: undefined,
  // })
  // const {date,setDate} = value;
  
  const value = useContext(DateContext);
    if (!value) {
        throw new Error('DateContext must be used within a DateContextProvider');
    }
    
    const {date,setDate} = value;
  

 

  return (
    <div className={cn("grid gap-2", className,inter.className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal rounded-xl",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className={`w-auto p-0 ${inter.className}`} align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
