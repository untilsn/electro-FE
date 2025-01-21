import React from 'react';
import { FiPhone } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../redux/slice/userSlice';

const HeaderTop = () => {
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.user)
  return (
    <div className="flex items-center justify-between py-3 border-b-2 border-grayColor  border-opacity-30">
      <div className="flex items-center gap-2 text-grayColor ">
        <span>
          <FiPhone className='text-sm' />
        </span>
        <span className="text-[13px] font-normal text-textColor">Điện thoại: +0123 456 789</span>
      </div>
      {userInfo.name !== "" ?
        <div className='text-white text-opacity-70'>welcomback <span className='text-light'> {userInfo.name}</span></div> :
        <button onClick={() => dispatch(openModal())} className='text-textColor text-sm'>Đăng nhập / Đăng kí </button>
       }
    </div>
  )
}

export default HeaderTop