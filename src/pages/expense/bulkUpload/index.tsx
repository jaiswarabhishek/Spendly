import FileUpload from "@/custom/components/FileUpload"

const index = () => {
  return (
   <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Upload Your Receipt/Excel File :
      </h1>

      <div>
       <code className="relative rounded bg-destructive px-[0.3rem] py-[0.2rem] font-mono text-sm text-popover font-semibold">
        File size should be  less than 5MB
      </code>
      </div>

      <div className="mt-2">
      <code className="relative rounded bg-destructive px-[0.3rem] py-[0.2rem] font-mono text-sm text-popover font-semibold">
       Don&apos;t Upload blurry Receipt images! All text in the receipt should be clearly visible
      </code>
      </div>

       <div className=" mt-2">
      <code className="relative rounded bg-destructive px-[0.3rem] py-[0.2rem] font-mono text-sm text-popover font-semibold">
        Excel file should have title, category, date, amount and description Columns only
      </code>
      </div>
      <FileUpload />
    </div>
  )
}

export default index