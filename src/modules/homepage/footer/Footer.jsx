import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import Logo from "../../../components/icon/LogoIcon";

const FooterLinkGroup = ({ title, links }) => (
  <div>
    <h1 className="text-lg font-semibold text-darkPrimary">{title}</h1>
    <ul className="flex flex-col gap-3 mt-5">
      {links.map((link, index) => (
        <li key={index}>
          <a
            href="#"
            className="text-sm text-gray text-opacity-70 hover:text-yellowColor"
          >
            {link}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  const usefulLinks = [
    "About Molla",
    "Our Services",
    "How to shop on Molla",
    "FAQ",
    "Contact us",
  ];

  const customerServiceLinks = [
    "Payment Methods",
    "Money-back guarantee!",
    "Returns",
    "Shipping",
    "Terms and conditions",
    "Privacy Policy",
  ];

  const myAccountLinks = [
    "Sign In",
    "View Cart",
    "My Wishlist",
    "Track My Order",
    "Help",
  ];

  return (
    <div className="py-20 border-t border-gray border-opacity-20">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo and Contact Info */}
        <div className="flex flex-col gap-5">
        
            <div><Logo color='#333333'></Logo></div>
          <p className="text-sm text-gray text-opacity-60 leading-7">
            Praesent dapibus, neque id cursus ucibus, tortor neque egestas
            augue, eu vulputate magna eros eu erat.
          </p>
          <div className="flex items-center gap-5 p-5 border border-gray border-opacity-20">
            <FaPhoneAlt className="text-3xl text-yellowColor" />
            <div>
              <p className="text-sm text-gray text-opacity-60">
                Got Question? Call us 24/7
              </p>
              <span className="text-base font-medium text-darkPrimary">+0123 456 789</span>
            </div>
          </div>
        </div>

        {/* Useful Links */}
        <FooterLinkGroup title="Useful Links" links={usefulLinks} />

        {/* Customer Service */}
        <FooterLinkGroup title="Customer Service" links={customerServiceLinks} />

        {/* My Account */}
        <FooterLinkGroup title="My Account" links={myAccountLinks} />
      </div>
    </div>
  );
};

export default Footer;
