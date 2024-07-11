import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import InputForm from "../../components/input/InputForm";
import InputContaint from "../../components/input/InputContaint";
import Label from "../../components/label/Label";
import ButtonForm from "../../components/button/ButtonForm";
import { useDispatch } from "react-redux";
import { openModalAuth } from "../../redux/slice/authSlice";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../config/firebaseConfigure";
import { useNavigate } from "react-router-dom";
import { useMutationHook } from "../../hooks/useMutation";
import { signupUser } from "../../service/useService";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const schema = yup.object({
    email: yup
      .string()
      .email("Your email is invalid")
      .required("Please enter your emailaddress"),
    username: yup.string().required("Please fill your username"),
    password: yup
      .string()
      .min(8, "Your password must be at least 8 character or greater"),
    confirmPassword: yup
      .string()
      .min(8, "Your password must be at least 8 character or greater"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });
  // const handleRegister = async (values, e) => {
  //   if (!values) return;
  //   try {
  //     dispatch(registerStart());
  //     const userCredential = await createUserWithEmailAndPassword(
  //       auth,
  //       values?.email,
  //       values?.password
  //     );
  //     await updateProfile(auth.currentUser, {
  //       displayName: values.username,
  //     });
  //     await setDoc(doc(db, "users", userCredential.user.uid), {
  //       displayName: values?.username,
  //       email: values?.email,
  //       role: "user",
  //       createAt: serverTimestamp(),
  //     });

  //     dispatch(openModalAuth(false));
  //     toast.success("Create account success");
  //   } catch (error) {
  //     toast.error("Create account error");
  //     console.log(error);
  //   }
  // };
  const handleRegisterGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      window.location.href = "/";
      dispatch(openModalAuth(false));
      toast.success("login with google success!");
    } catch (error) {
      console.log(error);
    }
  };

  const mutation = useMutationHook((data) => signupUser(data));
  const { isSuccess, isError, data } = mutation;
  const handleRegister = async (values) => {
    mutation.mutate({
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
      name: values.username,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("create user success");
      navigate("/");
    } else if (isError) {
      toast.error("none");
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(handleRegister)}>
      <div className="flex flex-col gap-5 py-5">
        <InputContaint>
          <Label id="email">email address *</Label>
          <InputForm
            name="email"
            control={control}
            placeholder="enter you emaildress"
          ></InputForm>
          {errors ? (
            <span className="text-redColor">{errors?.email?.message}</span>
          ) : (
            ""
          )}
        </InputContaint>
        <InputContaint>
          <Label id="username">username *</Label>
          <InputForm
            name="username"
            control={control}
            placeholder="enter you username"
          ></InputForm>
        </InputContaint>
        {errors ? (
          <span className="text-redColor">{errors?.username?.message}</span>
        ) : (
          ""
        )}
        <InputContaint>
          <Label id="password">password *</Label>
          <InputForm
            type="password"
            name="password"
            control={control}
            placeholder="enter you password"
          ></InputForm>
          {errors ? (
            <span className="text-redColor">{errors?.password?.message}</span>
          ) : (
            ""
          )}
        </InputContaint>
        <InputContaint>
          <Label id="confirmPassword">confirm Password *</Label>
          <InputForm
            type="confirmPassword"
            name="confirmPassword"
            control={control}
            placeholder="enter you confirmPassword"
          ></InputForm>
          {errors ? (
            <span className="text-redColor">{errors?.password?.message}</span>
          ) : (
            ""
          )}
        </InputContaint>
      </div>
      {/* button submit */}
      <div className="flex items-center justify-between my-5">
        <ButtonForm type="submit">SIGN UP</ButtonForm>
        <span className="text-sm capitalize hover:text-yellowColor">
          I agree to the privacy policy *
        </span>
      </div>
      <div className="w-full h-[1px] bg-slate-300"></div>
      <div className="p-4 text-sm text-center">or sign in with</div>
      <div className="flex items-center justify-center gap-20">
        <button
          onClick={() => handleRegisterGoogle()}
          className="flex items-center justify-center mt-5 max-w-[300px] w-full rounded-3xl hover:border-opacity-30 gap-3 p-3 border hover:bg-gray hover:bg-opacity-5 border-gray border-opacity-20"
        >
          <span>
            <img
              src="./google.png"
              className="object-cover w-6 h-6"
              alt="google"
            />
          </span>
          <span>Login with Google</span>
        </button>
      </div>
    </form>
  );
};

export default Register;
