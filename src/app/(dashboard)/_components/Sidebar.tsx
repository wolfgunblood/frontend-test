import React from 'react'
import SidebarRoutes from './SidebarRoutes'
import SidebarRoutesBottom from './SidebarRoutesBottom'

import Chart from './Chart'
import SidebarTop from './SidebarTop'


const Sidebar = () => {
  return (
    <div className="min-w-80 min-h-screen p-8 border-r border-zinc-200 overflow-y-auto flex flex-col justify-between" >
      {/* Sidebar Top */}
      <div className='flex flex-col items-center gap-8'>
        <SidebarTop />
        <SidebarRoutes />
      </div>
      {/* Chart */}
      <Chart />
      {/* Sidebar Bottom */}
      <SidebarRoutesBottom />
    </div>
  )
}

export default Sidebar