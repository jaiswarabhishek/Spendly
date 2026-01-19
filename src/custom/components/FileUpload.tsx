import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Trash2,Loader2 ,Upload,Eye} from 'lucide-react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import TableData from './TableData';
import * as XLSX from 'xlsx';

import { excelDateToJSDate } from '@/data/Utils'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Define the FileUpload component with proper typing
interface ExpenseData {
  title:string;
  total_amount:number;
  date:string;
  category:string;
  description:string
}

const FileUpload: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [base64Data,setBase64Data]=useState<string | undefined>('');
  const [loader,setLoader] = useState<boolean>(false);
  const [expenseData, setExpenseData] = useState<ExpenseData[]>([]);


  const onDrop = (acceptedFiles: File[]) => {
      console.log(acceptedFiles)
    setFiles(acceptedFiles);
     setExpenseData([]);

    const file = acceptedFiles[0]; // Get the first uploaded file

    if (file.type.startsWith('image/')){
    const reader = new FileReader();

    reader.onloadend = () => {
     
      const base64Data = typeof reader.result === 'string' ? reader.result.split(',')[1] : undefined;
      setBase64Data(base64Data);

    };

    if (file) {
      reader.readAsDataURL(file); // Convert the file to Base64
    }
  }
   else{
    const reader = new FileReader();

      reader.onload = (event) => {
        const binaryStr = event.target?.result;

        // Parse the Excel file
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData:ExpenseData[] = XLSX.utils.sheet_to_json(worksheet);

           console.log(jsonData)
           jsonData.map((expense)=>{
          expense.date = excelDateToJSDate(Number(expense.date))
        })


        setExpenseData(jsonData); // Set the parsed Excel data to state
        console.log(jsonData); // Handle the parsed data as needed
      };
      reader.readAsArrayBuffer(file); // Read Excel file as binary string

   }
    
    const newProgress = Array(acceptedFiles.length).fill(0);

  };

  // Dropzone configuration with types
  const { getRootProps, getInputProps, isDragActive,acceptedFiles,fileRejections } = useDropzone({
    onDrop,
    maxFiles:1,
    accept: {
    'image/*': ['.jpg', '.jpeg', '.png'],
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    // 'application/vnd.ms-excel': ['.xls', '.csv'],
    },
  });
 
    const handleUpload = async (base64Data:string) => {
      console.log(base64Data)
    if (!base64Data) return;
    setLoader(true);
    const response = await fetch('/api/ai/generate-content', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: base64Data }), // Send the Base64 data as JSON
                     });
    
    setLoader(false);

    if (response.ok) {

      const result = await response.json();
      setExpenseData(result);
 
    } 
    
    else {
       toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: response.statusText,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
    }

    };

  

  // Delete file handler
  const deleteFile = (fileIndex: number) => {
    setFiles([]);
    setExpenseData([]);
  };

  // Helper function to format file size
  const formatFileSize = (size: number) => {
    const units = ['B', 'KB', 'MB', 'GB'];
    let index = 0;
    while (size >= 1024 && index < units.length - 1) {
      size /= 1024;
      index++;
    }
    return `${size.toFixed(1)} ${units[index]}`;
  };

  return (
    <div className="p-4 border-dashed border-2  border-gray-300 bg-white rounded-xl w-2/3 mx-auto mt-20 ">
      <div
        {...getRootProps()}
        className={`py-16 text-center rounded-xl cursor-pointer ${isDragActive ? 'bg-blue-100' : 'bg-gray-50'}`}
      >
        <Input {...getInputProps()}/>
       { !isDragActive ? <svg className="z-10 w-16 h-16 text-primary mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
        </svg> :  <svg className="w-16 text-gray-400 mx-auto dark:text-neutral-400" width="70" height="46" viewBox="0 0 70 46" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.05172 9.36853L17.2131 7.5083V41.3608L12.3018 42.3947C9.01306 43.0871 5.79705 40.9434 5.17081 37.6414L1.14319 16.4049C0.515988 13.0978 2.73148 9.92191 6.05172 9.36853Z" fill="currentColor" stroke="currentColor" stroke-width="2" className="fill-white stroke-gray-400 dark:fill-neutral-800 dark:stroke-neutral-500"></path>
        <path d="M63.9483 9.36853L52.7869 7.5083V41.3608L57.6982 42.3947C60.9869 43.0871 64.203 40.9434 64.8292 37.6414L68.8568 16.4049C69.484 13.0978 67.2685 9.92191 63.9483 9.36853Z" fill="currentColor" stroke="currentColor" stroke-width="2" className="fill-white stroke-gray-400 dark:fill-neutral-800 dark:stroke-neutral-500"></path>
        <rect x="17.0656" y="1.62305" width="35.8689" height="42.7541" rx="5" fill="currentColor" stroke="currentColor" stroke-width="2" className="fill-white stroke-gray-400 dark:fill-neutral-800 dark:stroke-neutral-500"></rect>
        <path d="M47.9344 44.3772H22.0655C19.3041 44.3772 17.0656 42.1386 17.0656 39.3772L17.0656 35.9161L29.4724 22.7682L38.9825 33.7121C39.7832 34.6335 41.2154 34.629 42.0102 33.7025L47.2456 27.5996L52.9344 33.7209V39.3772C52.9344 42.1386 50.6958 44.3772 47.9344 44.3772Z" stroke="currentColor" stroke-width="2" className="stroke-gray-400 dark:stroke-neutral-500"></path>
        <circle cx="39.5902" cy="14.9672" r="4.16393" stroke="currentColor" stroke-width="2" className="stroke-gray-400 dark:stroke-neutral-500"></circle>
      </svg>
       }
        {isDragActive ? (
          <p>Drop the files here...</p>
        ) : (
          <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
        )}
      </div>

      {files.length > 0 && (
        <div className="mt-4">
          {files.map((file, index,errors) => (
            <div key={file.name} className="bg-gray-50 p-2 mb-2 rounded-md shadow-sm mt-2 ">
              {/* Top row: Image, Name, Size, and Delete Icon */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                 {file.type.startsWith('image/') ? (

              <Dialog>
                 <DialogTrigger asChild>
                    <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="w-20 h-20 object-cover rounded-md mr-4 cursor-pointer"
                     />
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="object-cover rounded-md mr-4"
              />
                  </DialogContent>
             </Dialog>

            ) : (
              <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-md mr-4">
               <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48">
              <rect width="16" height="9" x="28" y="15" fill="#21a366"></rect><path fill="#185c37" d="M44,24H12v16c0,1.105,0.895,2,2,2h28c1.105,0,2-0.895,2-2V24z"></path><rect width="16" height="9" x="28" y="24" fill="#107c42"></rect><rect width="16" height="9" x="12" y="15" fill="#3fa071"></rect><path fill="#33c481" d="M42,6H28v9h16V8C44,6.895,43.105,6,42,6z"></path><path fill="#21a366" d="M14,6h14v9H12V8C12,6.895,12.895,6,14,6z"></path><path d="M22.319,13H12v24h10.319C24.352,37,26,35.352,26,33.319V16.681C26,14.648,24.352,13,22.319,13z" opacity=".05"></path><path d="M22.213,36H12V13.333h10.213c1.724,0,3.121,1.397,3.121,3.121v16.425	C25.333,34.603,23.936,36,22.213,36z" opacity=".07"></path><path d="M22.106,35H12V13.667h10.106c1.414,0,2.56,1.146,2.56,2.56V32.44C24.667,33.854,23.52,35,22.106,35z" opacity=".09"></path><linearGradient id="flEJnwg7q~uKUdkX0KCyBa_UECmBSgBOvPT_gr1" x1="4.725" x2="23.055" y1="14.725" y2="33.055" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#18884f"></stop><stop offset="1" stop-color="#0b6731"></stop></linearGradient><path fill="url(#flEJnwg7q~uKUdkX0KCyBa_UECmBSgBOvPT_gr1)" d="M22,34H6c-1.105,0-2-0.895-2-2V16c0-1.105,0.895-2,2-2h16c1.105,0,2,0.895,2,2v16	C24,33.105,23.105,34,22,34z"></path><path fill="#fff" d="M9.807,19h2.386l1.936,3.754L16.175,19h2.229l-3.071,5l3.141,5h-2.351l-2.11-3.93L11.912,29H9.526	l3.193-5.018L9.807,19z"></path>
               </svg>
              </div>
            )}
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>

                <div className='flex items-center gap-2' >

                { expenseData.length>0 ?
                 <Dialog>
                 <DialogTrigger asChild>
                   <Button className='bg-green-700 text-popover hover:bg-green-700'>
                      <Eye className="mr-2 h-4 w-4"  /> View Details
                 </Button>
                  </DialogTrigger>
                  <DialogContent className='max-w-fit'>
                      <TableData expenseData={expenseData} />
                  </DialogContent>
                 </Dialog>
                 : <Button disabled={loader} className='bg-primary text-popover hover:bg-primary' onClick={()=>handleUpload(base64Data ? base64Data :'')}>
                      { loader ? <Loader2 className="animate-spin" size={24} />:<><Upload className="mr-2 h-4 w-4" />Upload </>}
                 </Button>
                }

                <Button
                  onClick={() => deleteFile(index)}
                  className="text-red-700 hover:text-red-700"
                  variant="outline" size="icon"
                >
                  <Trash2  size={24} />
                </Button>

                 </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
