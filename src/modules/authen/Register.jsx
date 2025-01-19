import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputForm from "../../components/input/InputForm";
import InputContaint from "../../components/input/InputContaint";
import Label from "../../components/label/Label";
import { MdEmail } from "react-icons/md";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import ButtonForm from "../../components/button/ButtonForm";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../config/firebaseConfigure";
import { useNavigate } from "react-router-dom";
import { useMutationHook } from "../../hooks/useMutation";
import { signupUser } from "../../service/useService";
import InputField from "../../components/input/InputField";
import InputError from "../../components/input/InputError";
import { closeModal } from "../../redux/slice/userSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showComfirmPassword, setShowComfirmPassword] = useState(false);

  const schema = yup.object({
    signupUsername: yup
      .string()
      .required("Username is required")
      .max(14, "Username must not exceed 14 characters"),
    signupEmail: yup
      .string()
      .required("Email address is required")
      .email("Your email is invalid"),
    signupPassword: yup
      .string()
      .required("Password is required")
      .min(8, "Your password must be at least 8 character or greater"),
    signupConfirmPassword: yup
      .string()
      .required('Confirm password is required')
      .oneOf([yup.ref("signupPassword"), null], "Confirm password must match the password"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      signupUsername: "",
      signupEmail: "",
      signupPassword: "",
      signupConfirmPassword: "",
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
       dispatch(closeModal())
      toast.success("login with google success!");
    } catch (error) {
      console.log(error);
    }
  };

  const mutation = useMutationHook((data) => signupUser(data));
  const { isSuccess, isError, data } = mutation;
  const handleRegister = async (values) => {
    mutation.mutate({
      name: values.signupUsername,
      email: values.signupEmail,
      password: values.signupPassword,
      confirmPassword: values.signupConfirmPassword,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(closeModal())
    } else if (isError) {
      toast.error("none");
    }
  }, [isSuccess, dispatch]);

  return (
    <form onSubmit={handleSubmit(handleRegister)}>
      <div className="flex flex-col gap-5 py-5">
        {/* email */}
        <InputContaint>
          <InputField
            name="signupUsername"
            control={control}
            type="text"
            placeholder="Username"
            icon={<FaUser />}
          ></InputField>
          <InputError error={errors?.signupUsername?.message}></InputError>
        </InputContaint>
        {/* username */}
        <InputContaint>
          <InputField
            name="signupEmail"
            control={control}
            type="email"
            placeholder="Email Address"
            icon={<MdEmail />}
          ></InputField>
          <InputError error={errors?.signupEmail?.message}></InputError>
        </InputContaint>
        {/* password */}

        <InputContaint>

          <InputField
            name="signupPassword"
            control={control}
            type={showPassword ? "text" : "password"}
            icon={showPassword ? <FaEye /> : <FaEyeSlash />}
            onClick={() => setShowPassword(!showPassword)}
            placeholder="Password"
          ></InputField>
          <InputError error={errors?.signupPassword?.message}></InputError>
        </InputContaint>
        {/* comfirm password  */}
        <InputContaint>
          <InputField
            name="signupConfirmPassword"
            control={control}
            type={showComfirmPassword ? "text" : "password"}
            icon={showComfirmPassword ? <FaEye /> : <FaEyeSlash />}
            onClick={() => setShowComfirmPassword(!showComfirmPassword)}
            placeholder="Comfirm Password"
          ></InputField>
          <InputError error={errors?.signupConfirmPassword?.message}></InputError>
        </InputContaint>
      </div>
      {/* button submit */}
      <div className="flex items-center justify-between my-5">
        <ButtonForm type="submit">SIGN UP</ButtonForm>
        <span className="text-sm capitalize hover:text-yellowColor">
          I agree to the privacy policy *
        </span>
      </div>
      {/* <div className="w-full h-[1px] bg-slate-300"></div>
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
      </div> */}
    </form>
  );
};

export default Register;
