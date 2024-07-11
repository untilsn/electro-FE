import React from "react";
import SupportServicesItem from "./path/SupportServicesItem";
import { SupportService } from "../../components/icon/IconService";

const SupportServicesBanner = () => {
  return (
    <div className="flex items-center justify-between gap-10 px-5 py-20 mt-20 border-t border-gray border-opacity-20 ">
      {SupportService.map((item) => (
        <div key={item.id}>
          <SupportServicesItem
            icon={item.icon}
            title={item.title}
            info={item.info}
          ></SupportServicesItem>
        </div>
      ))}
    </div>
  );
};

export default SupportServicesBanner;
