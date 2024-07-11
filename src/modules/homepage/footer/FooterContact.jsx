import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
const FooterContact = () => {
  return (
    <div className="py-20 border-t border-gray border-opacity-20">
      <div className="container grid grid-cols-4 gap-10 ">
        <div className="flex flex-col gap-5">
          <div className="max-w-[400xp] w-full text-left h-[70px]">
            <img
              className="object-contain w-full h-full"
              src="/public/logo.png"
              alt=""
            />
          </div>
          <p className="text-sm text-gray text-opacity-60">
            Praesent dapibus, neque id cursus ucibus, tortor neque egestas
            augue, eu vulputate magna eros eu erat.
          </p>
          <div className="flex items-center gap-5 p-5 border border-gray border-opacity-20">
            <div className="text-3xl text-yellowColor">
              <FaPhoneAlt />
            </div>
            <div>
              <div className="text-sm text-gray text-opacity-60">
                Got Question? Call us 24/7
              </div>
              <span className="text-base">+0123 456 789</span>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-lg">Useful Links</h1>
          <ul className="flex flex-col gap-3 mt-5">
            <li>
              <a
                className="text-sm hover:text-yellowColor text-gray text-opacity-70"
                href="#"
              >
                About Molla
              </a>
            </li>
            <li>
              <a
                className="text-sm hover:text-yellowColor text-gray text-opacity-70"
                href="#"
              >
                Our Services
              </a>
            </li>
            <li>
              <a
                className="text-sm hover:text-yellowColor text-gray text-opacity-70"
                href="#"
              >
                How to shop on Molla
              </a>
            </li>
            <li>
              <a
                className="text-sm hover:text-yellowColor text-gray text-opacity-70"
                href="#"
              >
                FAQ
              </a>
            </li>
            <li>
              <a
                className="text-sm hover:text-yellowColor text-gray text-opacity-70"
                href="#"
              >
                Contact us
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h1 className="text-lg">Customer Service</h1>
          <ul className="flex flex-col gap-3 mt-5">
            <li>
              <a
                className="text-sm hover:text-yellowColor text-gray text-opacity-70"
                href="#"
              >
                Payment Methods
              </a>
            </li>
            <li>
              <a
                className="text-sm hover:text-yellowColor text-gray text-opacity-70"
                href="#"
              >
                Money-back guarantee!
              </a>
            </li>
            <li>
              <a
                className="text-sm hover:text-yellowColor text-gray text-opacity-70"
                href="#"
              >
                Returns
              </a>
            </li>
            <li>
              <a
                className="text-sm hover:text-yellowColor text-gray text-opacity-70"
                href="#"
              >
                Shipping
              </a>
            </li>
            <li>
              <a
                className="text-sm hover:text-yellowColor text-gray text-opacity-70"
                href="#"
              >
                Terms and conditions
              </a>
            </li>
            <li>
              <a
                className="text-sm hover:text-yellowColor text-gray text-opacity-70"
                href="#"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h1 className="text-lg">My Account</h1>
          <ul className="flex flex-col gap-3 mt-5">
            <li>
              <a
                className="text-sm hover:text-yellowColor text-gray text-opacity-70"
                href="#"
              >
                Sign In
              </a>
            </li>
            <li>
              <a
                className="text-sm hover:text-yellowColor text-gray text-opacity-70"
                href="#"
              >
                View Cart
              </a>
            </li>
            <li>
              <a
                className="text-sm hover:text-yellowColor text-gray text-opacity-70"
                href="#"
              >
                My Wishlist
              </a>
            </li>
            <li>
              <a
                className="text-sm hover:text-yellowColor text-gray text-opacity-70"
                href="#"
              >
                Track My Order
              </a>
            </li>
            <li>
              <a
                className="text-sm hover:text-yellowColor text-gray text-opacity-70"
                href="#"
              >
                Help
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FooterContact;
