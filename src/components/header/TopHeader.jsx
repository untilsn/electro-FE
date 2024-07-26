import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModalAuth } from "../../redux/slice/authSlice";
const TopHeader = () => {
  const dispatch = useDispatch();
  const handleOpenModal = () => {
    dispatch(openModalAuth(true));
  };
  const users = useSelector((state) => state.user);
  // const [userName, setUserName] = useState(name);
  // useEffect(() => {
  //   setUserName(name);
  // }, []);
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray border-opacity-30">
      <div className="flex items-center gap-2">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-secondary"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
            />
          </svg>
        </span>
        <span className="text-sm text-textColor">Call: +0123 456 789</span>
      </div>
      {/* signin */}
      {users?.access_token ? (
        <div>
          <span className="text-gray">
            welcomback <span className="text-white">{users.name}</span>
          </span>
        </div>
      ) : (
        <button
          onClick={handleOpenModal}
          href="#"
          className="text-sm hover:text-yellowColor text-textColor"
        >
          Sign in / Sign up
        </button>
      )}
    </div>
  );
};

export default TopHeader;
