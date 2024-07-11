import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { sidebarLinks } from "../../components/icon/IconDashboardSidebar";
import { TbLetterM } from "react-icons/tb";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import { IoMdArrowDropright } from "react-icons/io";

const DashboardSidebar = () => {
  const location = useLocation();
  const [openAccordions, setOpenAccordions] = useState(() => {
    return sidebarLinks.map(() => false);
  });

  useEffect(() => {
    setOpenAccordions((prevState) =>
      prevState.map((state, index) => {
        const isAccuUrlMatch =
          location.pathname === sidebarLinks[index]?.accuUrl;
        const isAccuUrl2Match =
          location.pathname === sidebarLinks[index]?.accuUrl2;
        return isAccuUrlMatch || isAccuUrl2Match;
      })
    );
  }, []);

  const handleOpenAccordion = (index) => {
    setOpenAccordions((prevState) =>
      prevState.map((state, i) => (i === index ? !state : state))
    );
  };

  return (
    <div className="pt-10 border-r border-dark border-opacity-10">
      <div className="sidebar-logo">
        <NavLink to="/">
          <div className="flex items-center justify-center mb-10 text-6xl font-medium text-center uppercase text-yellowColor ">
            <span className="">M</span>
            <span className="normal-case text-darkPrimary">olla</span>
          </div>
        </NavLink>
        <span></span>
      </div>
      <div className="flex flex-col w-full gap-5">
        {sidebarLinks.map((link, index) => {
          return (
            <div key={link.title}>
              <Accordion open={openAccordions[index]}>
                <AccordionHeader
                  className={`pl-7 text-base border-t border-none w-full hover:bg-darkPrimary hover:bg-opacity-5`}
                  onClick={() => handleOpenAccordion(index)}
                >
                  <NavLink
                    to={link?.url}
                    className="flex items-center justify-between w-full"
                  >
                    <div className="flex items-center gap-5">
                      <span>{link?.accIcon1}</span>
                      {link?.title}
                    </div>
                    {/* {!link?.accTitle1 ? (
                      ""
                    ) : openAccordions[index] ? (
                      <div className="rotate-90">
                        <IoMdArrowDropright />
                      </div>
                    ) : (
                      <div>
                        <IoMdArrowDropright />
                      </div>
                    )} */}
                    {!link?.accTitle1 ? (
                      ""
                    ) : (
                      <IoMdArrowDropright
                        className={`${
                          openAccordions[index] ? "rotate-90" : "rotate-0"
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
                      } flex items-center gap-5 pl-7 py-4 font-medium text-base  w-full`}
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
                        } flex items-center gap-5 pl-7 py-4 font-medium text-base w-full`}
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
  );
};

export default DashboardSidebar;
