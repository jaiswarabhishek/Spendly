import React from 'react'
import useSWR from 'swr';

export interface ForecastData {
  ds: string;    // Date string, e.g., "2024-10-15"
  yhat: number;  // Predicted value for that date
}

// Fetcher function to be used with SWR
const fetcher = (...args: [RequestInfo, RequestInit?]) => 
  fetch(...args)
    .then((res) => res.json())
    .then((data) => 
      data.map((item: { ds: string; yhat: number }) => ({
        date: item.ds, // Renamed from ds to date
        "Predicted Expense": item.yhat // Renamed from yhat to predictedValue
      }))
    );


export const FetchForecastData = () => {

  const { data, error } = useSWR<ForecastData[]>('/api/forecast/expense/forecast', fetcher);
  
  return {
    data,error
  }
 
}

