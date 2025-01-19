import React, { useState } from 'react'
import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from "@material-tailwind/react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import Login from './Login';
import Register from './Register';
import { closeModal } from '../../redux/slice/userSlice';

const AuthModal = () => {
  const [activeTab, setActiveTab] = useState("Login");
  const isModalOpen = useSelector((state) => state.user.isModalOpen)
  const dispatch = useDispatch()
  const data = [
      {
          label: "Login",
          value: "Login",
          body: Login
      },
      {
          label: "Register",
          value: "Register",
          body: Register
      },
  ]

  if (!isModalOpen) return null;
  return (
    <div>
    {/* overlay */}
    <div onClick={() => dispatch(closeModal())} className="fixed inset-0 z-50 bg-black bg-opacity-25"></div>
    <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-white p-10 z-50 w-full max-w-[600px] h-[90vh] overflow-y-auto'>
        {/* close button */}
        <button onClick={() => dispatch(closeModal())} className='absolute right-0 top-0 bg-dark text-light p-3 text-2xl'><IoMdClose /></button>
        {/* modal */}
        <Tabs className="w-full" value={activeTab}>
            <TabsHeader
                className="rounded-none bg-transparent p-2 w-full mx-auto"
                indicatorProps={{
                    className:
                        "bg-transparent border-b border-gray-900 shadow-none rounded-none",
                }}
            >
                {data.map(({ label, value }) => (
                    <Tab
                        key={value}
                        value={value}
                        onClick={() => setActiveTab(value)}
                        className={`text-gray-900 text-xl pb-3 tracking-wide  font-medium transition-all ${activeTab === value ? "" : "text-gray-500 hover:text-yellowColor"} `}
                    >
                        {label}
                    </Tab>
                ))}
            </TabsHeader>
            <TabsBody>
                {data.map(({ value, desc, body }) => (
                    <TabPanel key={value} value={value}>
                        {React.createElement(body)}
                    </TabPanel>
                ))}
            </TabsBody>
        </Tabs>
    </div>
</div>
  )
}

export default AuthModal