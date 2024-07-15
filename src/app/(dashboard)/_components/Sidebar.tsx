import React from 'react'
import SidebarRoutes from './SidebarRoutes'

// type Props = {}

const Sidebar = () => {
  return (
    <div className='h-full border-r flex flex-col overflow-y-auto shadow-sm'>

      <div className='flex flex-col w-full'>
        <SidebarRoutes />
      </div>
    </div>
  )
}

export default Sidebar