import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import ShopBanner from "../../modules/shop/ShopBanner";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import InputForm from "../../components/input/InputForm";
import { useForm } from "react-hook-form";
import { updateUser } from "../../service/useService";
import { useMutationHook } from "../../hooks/useMutation";

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
      <ShopBanner title="Profile" subtitle="user"></ShopBanner>
      <Breadcrumb children="profile"></Breadcrumb>
      <div className="container py-20">
        <Card className="w-full mt-6">
          <div className="flex items-start justify-between h-[600px] gap-10">
            <CardHeader color="blue-gray" className="relative flex-1 h-80">
              <img
                src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                alt="card-image"
              />
            </CardHeader>
            <form onSubmit={handleSubmit(handleUpdateUser)} className="flex-1">
              <CardBody className="py-0">
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="mb-2 capitalize"
                >
                  user infomation
                </Typography>
                <div className="flex flex-col gap-10 mt-5 mb-10">
                  <InputForm
                    name="name"
                    control={control}
                    placeholder="enter your name"
                  ></InputForm>
                  <InputForm
                    name="email"
                    control={control}
                    placeholder="enter your email"
                  ></InputForm>
                  <InputForm
                    name="phone"
                    control={control}
                    placeholder="enter your phone"
                  ></InputForm>
                  <InputForm
                    name="address"
                    control={control}
                    placeholder="enter your address"
                  ></InputForm>
                </div>
              </CardBody>
              <CardFooter className="pt-0">
                <Button
                  type="submit"
                  className="capitalize bg-black w-[100px] text-base"
                >
                  update
                </Button>
              </CardFooter>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
