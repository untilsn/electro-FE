import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { MdFavoriteBorder } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";

const HeaderRight = () => {
    const { wishlist } = useSelector(state => state.wishlist)
    const  {orderItems}  = useSelector(state => state.order)
    const HEADERRIGHT = [
        {
            id: 2,
            name: "yêu thích",
            icon: <MdFavoriteBorder />,
            url: "/wishlist",
            length: wishlist?.length || 0,
        },
        {
            id: 3,
            name: "giỏ hàng",
            icon: <IoCartOutline />,
            url: "/cart",
            length: orderItems?.length || 0,
        },
    ];
    return (
        <div className='flex items-center justify-end'>
            {HEADERRIGHT.map((item) => (
                <Link
                    to={item.url}
                    key={item.id} className="flex flex-col items-center justify-center gap-1 ml-7 text-light transition-all hover:text-yellowColor ">
                    <div className="relative ">
                        <span className='text-3xl font-extralight'>
                            {item.icon}
                        </span>
                        <div className="absolute font-medium top-0 flex items-center justify-center w-4 h-4 text-[11px] border border-dark text-dark  rounded-full -right-2 bg-yellowColor">
                            {item.length}
                        </div>
                    </div>
                    <span className='text-xs text-grayColor'>
                        {item.name}
                    </span>
                </Link>
            ))}
        </div>
    )
}

export default HeaderRight