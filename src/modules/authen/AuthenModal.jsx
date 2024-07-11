import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { useDispatch, useSelector } from "react-redux";
import { openModalAuth } from "../../redux/slice/authSlice";

const AuthenModal = () => {
  const { authModal } = useSelector((state) => state.auth);
  const [isLogin, setIsLogin] = useState("login");
  const dispatch = useDispatch();
  return (
    <div className={`${authModal ? "" : "opacity-0 invisible select-none"} `}>
      {/* overlay */}
      <div
        onClick={() => dispatch(openModalAuth(false))}
        className="fixed inset-0 z-50 bg-black bg-opacity-25"
      ></div>
      {/* modal */}
      <div className="max-w-[620px] w-full rounded z-50 p-14 bg-light  fixed inset-0 top-2/4 left-2/4 -translate-x-2/4 overflow-y-auto -translate-y-2/4 h-[90vh]">
        {/* close */}
        <button
          onClick={() => dispatch(openModalAuth(false))}
          className="absolute p-3 top-5 right-5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
        {/* modal content */}
        <div className="flex items-center w-full border-b border-gray border-opacity-20">
          <span
            onClick={() => setIsLogin("login")}
            className={`${
              isLogin === "login"
                ? " border-b  border-yellowColor"
                : " hover:text-yellowColor"
            } flex-1 p-4 text-2xl text-center`}
          >
            Login
          </span>
          <span
            onClick={() => setIsLogin("register")}
            className={`${
              isLogin === "register"
                ? " border-b  border-yellowColor"
                : " hover:text-yellowColor"
            } flex-1 p-4 text-2xl text-center`}
          >
            Register
          </span>
        </div>
        {isLogin === "login" ? <Login></Login> : <Register></Register>}
      </div>
    </div>
  );
};

export default AuthenModal;
