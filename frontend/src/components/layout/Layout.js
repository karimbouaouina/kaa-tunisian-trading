import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="bg-gray-100 flex flex-row min-h-screen">
      <Navbar />
      <div className='w-full flex flex-col'>
      <Outlet />
      <Footer />
      </div>

    </div>
  )
}
