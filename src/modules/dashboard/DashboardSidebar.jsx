import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import { IoMdArrowDropright } from "react-icons/io";
import { Fragment } from "react";
import { MANAGELIST } from "../../utils/ManageSidebarList";

const DashboardSidebar = () => {
  const location = useLocation();
  const [openAccordions, setOpenAccordions] = useState(() => {
    return MANAGELIST.map(() => false);
  });

  useEffect(() => {
    setOpenAccordions((prevState) =>
      prevState.map((state, index) => {
        const isAccuUrlMatch = location.pathname === MANAGELIST[index]?.accuUrl;
        const isAccuUrl2Match =
          location.pathname === MANAGELIST[index]?.accuUrl2;
        return isAccuUrlMatch || isAccuUrl2Match;
      })
    );
  }, [location.pathname]);

  const handleOpenAccordion = (index) => {
    setOpenAccordions((prevState) =>
      prevState.map((state, i) => (i === index ? !state : state))
    );
  };

  return (
    <div className="">
      <div className="fixed m-4 bg-white max-w-[280px] w-full border top-2 left-2 bottom-2 overflow-y-scroll 	 border-gray border-opacity-10 rounded-xl py-7">
        <div className="sidebar-logo">
          <NavLink to="/">
            <div className="flex items-center justify-center text-6xl font-medium text-center uppercase pb-7 text-yellowColor ">
              <span className="">M</span>
              <span className="normal-case text-darkPrimary">olla</span>
            </div>
          </NavLink>
        </div>
        <div className="flex flex-col w-full gap-5 overflow-y-auto">
          {MANAGELIST.map((link, index) => {
            const isOpen = openAccordions[index];
            return (
              <div key={link.title}>
                <Accordion open={isOpen}>
                  <AccordionHeader
                    className={`pl-7 text-sm py-2 border-none w-full transition duration-300 hover:bg-darkPrimary hover:bg-opacity-5`}
                    onClick={() => handleOpenAccordion(index)}
                  >
                    <NavLink
                      to={link?.url}
                      className="flex items-center justify-between w-full"
                    >
                      <div className="flex items-center gap-5">
                        <span
                          className={`p-3 rounded-xl ${
                            isOpen
                              ? "bg-yellowColor text-white "
                              : "bg-[#E9ECEF]"
                          } shadow-xl`}
                        >
                          {link?.accIcon1}
                        </span>
                        {link?.title}
                      </div>
                      {!link?.accTitle1 ? (
                        ""
                      ) : (
                        <IoMdArrowDropright
                          className={`${
                            isOpen ? "rotate-90" : "rotate-0"
                          } transition-all`}
                        />
                      )}
                    </NavLink>
                  </AccordionHeader>
                  {link.accTitle1 ? (
                    <AccordionBody className="flex flex-col gap-3 capitalize">
                      <NavLink
                        to={link.accuUrl}
                        className={`${
                          location.pathname === link?.accuUrl
                            ? "text-dark bg-darkPrimary bg-opacity-5"
                            : "text-dark hover:bg-darkPrimary hover:bg-opacity-5"
                        } flex items-center gap-5 pl-7 py-4 font-medium text-sm  w-full`}
                      >
                        <span className="opacity-0 menu-icon text-2">
                          {link.accIcon1}
                        </span>
                        <span className="menu-text">{link.accTitle1}</span>
                      </NavLink>
                      {link.accTitle2 ? (
                        <NavLink
                          to={link.accuUrl2}
                          className={`${
                            location.pathname === link?.accuUrl2
                              ? "text-dark bg-darkPrimary bg-opacity-5"
                              : "text-dark hover:bg-darkPrimary hover:bg-opacity-5"
                          } flex items-center gap-5 pl-7 py-4 font-medium text-sm w-full`}
                        >
                          <span className="opacity-0 menu-icon text-2">
                            {link?.accIcon2}
                          </span>
                          <span className="menu-text">{link?.accTitle2}</span>
                        </NavLink>
                      ) : (
                        ""
                      )}
                    </AccordionBody>
                  ) : (
                    ""
                  )}
                </Accordion>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
