import React from 'react'
import { FaAngleRight } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom"
import { toast } from 'react-toastify'
import { resetUser } from '../../redux/slice/userSlice'
import { logoutUser } from '../../service/useService'
import { IoLogOutOutline } from 'react-icons/io5'
import { MdManageSearch } from "react-icons/md";
import { BiSolidUserDetail } from 'react-icons/bi'

const UserMenu = () => {
  const dispatch = useDispatch()

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(resetUser());
      toast.success("logout user success");
      // localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='bg-white shadow p-5 w-full'>
      <div className='flex flex-col gap-5 w-full'>
        <Link
          to="/manage/product"
          className="flex items-center justify-between w-full text-sm hover:text-yellowColor text-gray text-opacity-90"
        >
          <span className='capitalize'>Trang quản lý</span>
        </Link>
        <div className='w-full bg-dark bg-opacity-20 h-[1px]'></div>
        <Link
          to="/profile"
          className="flex items-center justify-between w-full text-sm hover:text-yellowColor text-gray text-opacity-90"
        >
          <span className='capitalize'>Chi tiết người dùng</span>
        </Link>
        <Link
          to="/user-order"
          className="flex items-center justify-between w-full text-sm hover:text-yellowColor text-gray text-opacity-90"
        >
          <span className='capitalize'>trang đặt hàng</span>
        </Link>
        <div className='w-full bg-dark bg-opacity-20 h-[1px]'></div>
        <div
          onClick={handleLogout}
          className="flex items-center justify-between w-full text-sm hover:text-yellowColor text-grayDark "
        >
          <span className='capitalize'>đăng xuất</span>
          <span>
            <IoLogOutOutline className='text-sm' />
          </span>
        </div>
      </div>
    </div>
  )
}

export default UserMenu