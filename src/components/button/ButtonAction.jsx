import React from 'react'

const ButtonAction = ({ icon, onClick = () => {}}) => {
  return (
    <span
      className="flex items-center justify-center border rounded cursor-pointer w-9 h-9 border-gray"
      onClick={onClick}
    >
      {icon}
    </span>
  )
}

export default ButtonAction