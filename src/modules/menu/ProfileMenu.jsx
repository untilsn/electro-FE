import React from "react";
import { FaAngleRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../service/useService";
import { resetUser } from "../../redux/slice/userSlice";

const ProfileMenu = () => {
  const users = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(resetUser());
      toast.success("logout success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" h-[500xp] bg-white shadow-md absolute top-[100%] p-10 left-0">
      <div className="flex flex-col w-full gap-3">
      
          <Link
            to="/manage/dashboard"
            className="flex items-center justify-between w-full text-sm hover:text-yellowColor text-gray text-opacity-90"
          >
            <span>manage</span>
            <span>
              <FaAngleRight className="text-sm" />
            </span>
          </Link>
       
        {users.access_token !== "" ? (
          <Link
            to="/profile"
            className="flex items-center justify-between w-full text-sm hover:text-yellowColor text-grayDark "
          >
            <span>Profile</span>
            <span>
              <FaAngleRight className="text-sm" />
            </span>
          </Link>
        ) : (
          ""
        )}
        {users.access_token !== "" ? (
          <div
            onClick={() =>
              navigate("/user-order", {
                state: {
                  id: users?.id,
                  token: users?.access_token,
                },
              })
            }
            className="flex items-center justify-between w-full text-sm hover:text-yellowColor text-grayDark "
          >
            <span>My order</span>
            <span>
              <FaAngleRight className="text-sm" />
            </span>
          </div>
        ) : (
          ""
        )}

        <div
          onClick={handleLogout}
          className="flex items-center justify-between w-full text-sm hover:text-yellowColor text-grayDark "
        >
          <span>logout</span>
          <span>
            <FaAngleRight className="text-sm" />
          </span>
        </div>
        {/* <Outlet></Outlet> */}
      </div>
    </div>
  );
};

export default ProfileMenu;
