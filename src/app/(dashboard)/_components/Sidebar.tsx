import React from 'react'
import SidebarRoutes from './SidebarRoutes'
import { Button } from '~/components/ui/button'
import SidebarRoutesBottom from './SidebarRoutesBottom'

// type Props = {}

const Sidebar = () => {
  return (
    <div
    style={{
      width: '320px', 
      // height: '1286px', 
      padding: '32px 0 0 0',
      borderRight: '1px solid',
    
    }}
    className='flex flex-col justify-between overflow-y-auto shadow-sm'
  >
      <div>
        <div className='flex flex-col gap-2'>
          <Button>
            Create a podcast
          </Button>
          <Button variant="ghost">
            The Diary of a CEO
          </Button>
        </div>
        <div className='flex flex-col w-full'>
          <SidebarRoutes />
        </div>
      </div>

      <div>
        Charts
      </div>
      <div>
        <SidebarRoutesBottom />
      </div>
    </div>
  )
}

export default Sidebar