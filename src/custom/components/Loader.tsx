import React from 'react'

const Loader = () => {
  return (
    <div> 
        <div className="flex justify-center items-center h-screen">
              <div className="relative">
              <div className="w-10 h-10 border-2 border-primary border-t-transparent border-solid rounded-full animate-spin"></div>
              </div>
        </div>
    </div>
  )
}

export default Loader