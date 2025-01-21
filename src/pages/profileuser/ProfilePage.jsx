import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShopBanner from "../../modules/shop/ShopBanner";
import { useForm } from "react-hook-form";
import { updateUser } from "../../service/useService";
import { useMutationHook } from "../../hooks/useMutation";
import MainBreadcrumbs from "../../components/breadcrumb/MainBreadcrumb";
import InputField from "../../components/input/InputField";
import { MdEmail } from 'react-icons/md';
import { FaAddressBook, FaPhone, FaUser } from 'react-icons/fa6';


const ProfilePage = () => {
  const users = useSelector((state) => state.user);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (users && Object.keys(users).length > 0) {
      setIsUserLoaded(true);
    }
  }, [users]);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: users.name || "",
      email: users.email || "",
      phone: users.phone || "",
      address: users.address || "",
    },
    mode: "onSubmit",
  });

  useEffect(() => {
    if (isUserLoaded) {
      setValue("name", users.name || "");
      setValue("email", users.email || "");
      setValue("phone", users.phone || "");
      setValue("address", users.address || "");
    }
  }, [isUserLoaded, users, setValue]);

  const mutation = useMutationHook((value) => {
    const { id, access_token, ...rest } = value;
    const result = updateUser(id, access_token, rest);
    return result;
  });

  const handleUpdateUser = async (data) => {
    await mutation.mutateAsync({
      id: users.id,
      access_token: users.access_token,
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
    });
  };

  if (!isUserLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ShopBanner title="Hồ sơ" subtitle="user"></ShopBanner>
      <MainBreadcrumbs></MainBreadcrumbs>
      <div className="container py-20">
        <h1 className="capitalize font-semibold text-xl text-dark mb-10">thông tin người dùng</h1>
        <div className="py-20 bg-white p-5 rounded-2xl shadow-md  px-20">
          <div className="flex items-center gap-20">
            {/* info */}
            <form onSubmit={handleSubmit(handleUpdateUser)} className="grid grid-cols-2 gap-10 w-full  ">
              <InputField
                name="email"
                control={control}
                type="email"
                icon={<MdEmail />}
                placeholder="Email Address"
              ></InputField>
              <InputField
                name="name"
                control={control}
                type="text"
                icon={<FaUser />}
                placeholder="Username"
              ></InputField>
              <InputField
                name="address"
                control={control}
                type="text"
                icon={<FaAddressBook />}
                placeholder="Address"
              ></InputField>
              <InputField
                name="phone"
                control={control}
                type="number"
                icon={<FaPhone />}
                placeholder="Phone number"
              ></InputField>
              <div>
                <button className="py-5 px-10 font-semibold bg-dark text-white rounded-xl capitalize" type="submit">cập nhập</button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
