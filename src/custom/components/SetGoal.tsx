import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Brain } from 'lucide-react';

const SetGoal = () => {
  return (
    <div><Dialog>
      <DialogTrigger asChild>
<Button className="p-[3px] relative rounded-3xl bg-none">
  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl" />
  <div className="px-2 py-2   rounded-[6px]  relative group transition duration-200 text-popover hover:bg-transparent flex items-center gap-2">
    {/* <img width="28" height="28" src="/ai-technology.png" alt="goal--v1"/> */}
    <Brain />
    Recommendation
  </div>
</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
           
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            
          </div>
        </div>
        <DialogFooter>
          {/* <Button type="submit">Save changes</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog></div>
  )
}

export default SetGoal