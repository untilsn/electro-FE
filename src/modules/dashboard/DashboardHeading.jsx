import React from 'react'
import { IoMdHome } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const DashboardHeading = () => {
  const users = useSelector((state) => state.user)
  return (
    <div className='h-20 bg-grayDark/10 flex items-center justify-between px-5 mb-5'>
      <Link to="/" className='p-3 rounded-lg bg-dark flex items-center gap-3 capitalize text-white '>
        <IoMdHome className='text-white text-lg' /> trang chủ
      </Link>
      <div className='flex items-center gap-3 mr-10'>
        <span className='text-lg font-medium'>Admin {users.name}</span>
        <div className='max-w-[50px] '>
          <img className='w-full h-full object-cover rounded-full' src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png" alt="" />
        </div>
      </div>
    </div>
  )
}

export default DashboardHeading