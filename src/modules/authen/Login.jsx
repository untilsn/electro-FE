import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import InputContaint from "../../components/input/InputContaint";
import ButtonForm from "../../components/button/ButtonForm";
import { auth, db, provider } from "../../config/firebaseConfigure";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useMutationHook } from "../../hooks/useMutation";
import { getDetailsUser, loginUser } from "../../service/useService";
import { jwtDecode } from "jwt-decode";
import { closeModal, updateUser } from "../../redux/slice/userSlice";
import InputField from "../../components/input/InputField";
import { MdEmail } from "react-icons/md";
import InputError from "../../components/input/InputError";
import logoGoogle from "../../assets/image/google.png"


const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const schema = yup.object({
        loginEmail: yup
            .string()
            .required("Email address is required")
            .email("Your email is invalid"),
        loginPassword: yup
            .string()
            .required("Password is required")
            .min(8, "Your password must be at least 8 character or greater"),
    })

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            loginEmail: "admin123456@gmail.com",
            loginPassword: "admin123456",
        },
        mode: "onSubmit",
        resolver: yupResolver(schema),
    });


    const mutation = useMutationHook((data) => loginUser(data));
    const handleLogin = (values) => {
        mutation.mutate({
            email: values.loginEmail,
            password: values.loginPassword,
        });
    };
    const { data, isSuccess, isError } = mutation;
    useEffect(() => {
        if (isSuccess && data?.access_token) {
            // navigate("/");
            localStorage.setItem("access_token", JSON.stringify(data?.access_token));
            localStorage.setItem(
                "refresh_token",
                JSON.stringify(data?.refresh_token)
            );
            if (data?.access_token) {
                const decoded = jwtDecode(data?.access_token);
                if (decoded?.id) {
                    handleGetDetailsUser(decoded?.id, data?.access_token);
                }
            }
            dispatch(closeModal())
        } else if (isError) {
            toast.error("login error");
        }
    }, [isSuccess]);

    const handleGetDetailsUser = async (id, access_token) => {
        const storage = localStorage.getItem("refresh_token");
        const refreshToken = JSON.parse(storage);
        const res = await getDetailsUser(id, access_token);
        dispatch(
            updateUser({
                ...res?.data,
                access_token: access_token,
                refresh_token: refreshToken,
            })
        );
    };

    return (
        <form onSubmit={handleSubmit(handleLogin)}>
            <div className="flex flex-col gap-5 py-5">
                <InputContaint>
                    <InputField
                        name="loginEmail"
                        control={control}
                        type="email"
                        placeholder="Email Address"
                        icon={<MdEmail />}
                    ></InputField>
                    <InputError error={errors?.loginEmail?.message}></InputError>
                </InputContaint>
                <InputContaint>
                    <InputField
                        name="loginPassword"
                        control={control}
                        type={showPassword ? "text" : "password"}
                        icon={showPassword ? <FaEye /> : <FaEyeSlash />}
                        onClick={() => setShowPassword(!showPassword)}
                        placeholder="Password"
                    ></InputField>
                    <InputError error={errors?.loginPassword?.message}></InputError>
                </InputContaint>
            </div>
            {/* button submit */}
            <div className="flex items-center justify-between my-5">
                <ButtonForm type="submit">LOG IN</ButtonForm>
                <span className="text-sm capitalize hover:text-yellowColor">
                    forget password
                </span>
            </div>
        </form>
    );
};

export default Login;
