import React, { useEffect, useState } from "react";
import { FaArrowUpLong } from "react-icons/fa6";

const ScrollTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Lắng nghe sự kiện cuộn trang
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      // Loại bỏ lắng nghe sự kiện khi component unmount
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // Hàm kiểm tra và cập nhật trạng thái của nút scroll to top
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Hàm xử lý sự kiện scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {isVisible ? (
        <button
          onClick={scrollToTop}
          className="fixed p-5 transition-all translate-y-0 rounded cursor-pointer opacity-60 hover:opacity-100 bg-light text-gray hover:bg-light bg-opacity-80 bottom-10 right-10"
        >
          <FaArrowUpLong />
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default ScrollTopButton;
