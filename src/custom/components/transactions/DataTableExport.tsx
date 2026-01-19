"use client"

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { MixerHorizontalIcon,DownloadIcon} from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { format } from 'date-fns';

  const exportToCSV = (selectedRows:any) => {
      // Get the current date and time using date-fns
  const now = new Date();
   const formattedDateTime = format(now, 'dd-MM-yyyy_HH:mm a'); // Format as DD-MM-YYYY_HH:MM AM/PM
  const fileName = `Spendly_Transaction_${formattedDateTime}.csv`;

    const headers = ['Transaction ID', 'Date','Category','Amount'];
    const csvRows = [headers.join(',')];

    selectedRows.forEach((row:any) => {
      const values = [row.id, row.date,row.category,row.amount];
      csvRows.push(values.join(','));
    });

    const csvContent = `data:text/csv;charset=utf-8,${csvRows.join('\n')}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
  };

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
}

export function DataTableExport<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {

  const transactions = table.getSelectedRowModel().rows.map((item)=>{
      const {amount,id,category,date} = item._valuesCache;
        return {id:id, date:date,category:category,amount:amount}
    })
 
    console.log(transactions)

  return (
        <Button
          variant="default"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
          onClick={()=>exportToCSV(transactions)}
        >
          <DownloadIcon className="mr-2 h-4 w-4" />
          Export
        </Button>
  )
}
