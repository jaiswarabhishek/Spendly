import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { FetchForecastData, ForecastData } from "@/data/FetchForecastData"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import Image from "next/image"
export const description = "An area chart with gradient fill"
import Loader from "@/custom/components/Loader"

const chartConfig = {
  desktop: {
    label: "Predicted Value",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export default function index() {

   const {data,error} = FetchForecastData();

   console.log(data)

       if (error) return <div className="h-full flex flex-col justify-center items-center">
    <Image height={350} width={350} src="/error_expense.png" alt="Failed To Load Data" className="mx-auto" />
      <div className="text-center mt-10">
      <h2 className="text-2xl font-semibold text-red-700">Oops! Something went wrong.</h2>
      <p className="text-gray-600 mt-2">We couldn&apos;t load the forecasted data. Please try again later.</p>
    </div>
    </div>

    if (!data) return <Loader />



  return (
    <Card>
      <CardHeader>
        <CardTitle>Next 10 Days - Expense Forecast</CardTitle>
        <CardDescription>
          The following Chart data represents the predicted expenses for the upcoming days based on your spending habits.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              // tickMargin={0}
              minTickGap={32}
               tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-IN", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip  content={<ChartTooltipContent className="min-w-[210px] w-fit"   labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-IN", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }} />} />
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="Predicted Expense"
              type="linear"
              fill="url(#fillDesktop)"
              strokeWidth={2}
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
