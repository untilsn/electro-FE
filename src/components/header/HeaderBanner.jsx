import React from 'react';
import IMAGES from '../../constants/Images';

const HeaderBanner = ({ title, subtitle = "Very us more blessed multiphy night" }) => {
  return (
    <div className='border-b border-gray-100'>
      <div
        className="py-16"
        style={{
          backgroundImage: `url(${IMAGES.BREADCRUMB_HEADER})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="text-center capitalize">
          <h1 className="text-4xl text-darkPrimary font-medium">{title}</h1>
          <h2 className="mt-2 text-lg text-yellowColor">{subtitle}</h2>
        </div>
      </div>
    </div>

  )
}

export default HeaderBanner