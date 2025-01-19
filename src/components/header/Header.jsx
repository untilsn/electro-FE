import React from 'react'
import HeaderTop from './HeaderTop'
import HeaderMiddle from './HeaderMiddle'
import HeaderBottom from './HeaderBottom'



const Header = () => {
  return (
    <>
      <div className='bg-dark bg-opacity-95'>
        <div className='flex flex-col container'>
          <HeaderTop></HeaderTop>
          <HeaderMiddle></HeaderMiddle>
        </div>
      </div>
      <div className='sticky -top-1 z-50'>
        <HeaderBottom></HeaderBottom>
      </div>
    </>
  )
}

export default Header