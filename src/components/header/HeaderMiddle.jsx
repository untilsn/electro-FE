import React from 'react'
import HeaderSearch from './HeaderSearch'
import HeaderRight from './HeaderRight'
import Logo from '../icon/LogoIcon'

const HeaderMiddle = () => {
  return (
    <div className='grid grid-cols-4 items-center py-5'>
      <div><Logo color='#f8f9fa'></Logo></div>
      <div className='col-span-2'><HeaderSearch></HeaderSearch></div>
      <div><HeaderRight></HeaderRight></div>
    </div>
  )
}

export default HeaderMiddle