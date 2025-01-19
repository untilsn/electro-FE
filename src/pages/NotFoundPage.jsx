import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRightLong } from "react-icons/fa6";

const NotFoundPage = () => {
  return (
    <div className='container py-20'>
      <div className='flex flex-col items-center justify-center p-10 gap-10'>
        <h1 className='text-6xl font-bold'>Error 404 </h1>
        <span className='text-lg text-grayDark/60 font-semibold capitalize'>xin lỗi, trang không tìm thấy</span>
        <Link className='py-5 px-10 capitalize border border-yellowColor flex item gap-5 hover:bg-yellowColor hover:text-white transition-all' to="/">quay về trang chủ <FaArrowRightLong />
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage