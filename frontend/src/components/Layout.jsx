
import React from 'react'
import SideBar from './Sidebar.jsx'
import Navbar from './Navbar.jsx'

const Layout = ({children, showSideBar=false}) => {
  return (
    <div className='min-h-screen bg-base-100'>
        <div className='flex min-h-screen'>
            {showSideBar && <SideBar/>}

            <div className='flex-1 flex flex-col'>
              <Navbar/>

              <main className='flex-1 overflow-y-auto bg-base-100'>
                <div className='min-h-full'>
                  {children}
                </div>
              </main>
            </div>
        </div>
    </div>
  )
}

export default Layout