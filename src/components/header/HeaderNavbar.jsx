import React from 'react'
import { NavLink, useLocation } from "react-router-dom"
import { HEADERNAVBAR } from '../../constant/HeaderNavbarList'

const HeaderNavbar = () => {
    const location = useLocation()

    return (
        <div className='flex items-center px-2 border-x border-darkPrimary border-opacity-10'>
            {HEADERNAVBAR.map(item => (
                <div key={item.id} className="relative group w-full">
                    {/* Nếu có menu, không dùng NavLink */}
                    {item.menu ? (
                        <div className="px-3 py-[14px] flex items-center justify-center cursor-pointer">
                            <span className="transition-all font-medium capitalize text-[13px] text-darkPrimary group-hover:text-yellowColor">
                                {item.title}
                            </span>
                            {item.icon && <i className='ml-1'>{item.icon}</i>}
                        </div>
                    ) : (
                        <NavLink
                            to={item.url}
                            className={({ isActive }) => `group relative w-full ${isActive ? 'text-yellowColor' : ''}`}
                        >
                            <div className="px-3 py-[14px] flex items-center justify-center">
                                <span className={`transition-all font-medium capitalize text-[13px] ${location.pathname === item.url ? 'text-yellowColor' : 'text-darkPrimary'}`}>
                                    {item.title}
                                </span>
                                <span
                                    className={`absolute bottom-0 left-0 h-[1.2px] transition-all duration-300 group-hover:w-full ${location.pathname === item.url ? "w-full" : "w-0"} bg-yellowColor bg-opacity-80`}
                                ></span>
                                <span className={`absolute bottom-0 right-0 h-[1.2px] transition-all duration-300 group-hover:w-full ${location.pathname === item.url ? "w-full" : "w-0"} bg-yellowColor bg-opacity-80`}></span>
                                {item.icon && <i className='ml-1'>{item.icon}</i>}
                            </div>
                        </NavLink>
                    )}

                    {/* Menu dropdown */}
                    {item.menu && (
                        <div className='absolute left-0 top-full w-full min-w-[300px] whitespace-nowrap bg-white shadow-lg z-10 hidden group-hover:block'>
                            {item.menu}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default HeaderNavbar
