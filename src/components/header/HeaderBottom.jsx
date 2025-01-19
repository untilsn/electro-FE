import React from 'react'
import HeaderNavbar from './HeaderNavbar'
import HeaderLeft from './HeaderLeft'

const HeaderBottom = () => {
    return (
        <div className='shadow-primaryShadow border-b border-darkPrimary border-opacity-5 bg-white '>
            <div className='grid grid-cols-4 container'>
                <HeaderLeft></HeaderLeft>
                <div className='col-span-2'>
                    <HeaderNavbar></HeaderNavbar>
                </div>
            </div>
        </div>
    )
}

export default HeaderBottom