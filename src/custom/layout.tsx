import React from 'react'
import SideBar from './components/SideBar'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='m-5 rounded-xl grid grid-cols-5 p-2 shadow-md border-blue-700 border-2 bg-muted/40'>

        <SideBar />

        <main className=' m-2 col-span-4 rounded-xl'>{children}</main>

    </div>
  )
}

export default Layout