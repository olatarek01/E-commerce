"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faLock,
  faShield,
  faSpinner,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import loginSchema, { LoginScreenType } from "../../schemas/Login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import LoginAction from "../../server/Login.action";
import { setAuthInfo } from "../../store/auth.slice";
import { setToken } from "../../server/auth.actions";

export default function LoginForm() {
  const Router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginScreenType>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  const onSubmit: SubmitHandler<LoginScreenType> = async (values) => {
    setLoading(true);
    try {
      const result = await LoginAction(values);
      if (result.success) {
        await setToken(result.data.token, values.rememberMe ?? false);
        dispatch(
          setAuthInfo({
            isAuthenticated: true,
            userInfo: { ...result.data.user },
          }),
        );
        toast.success("Signed in successfully!");
        setTimeout(() => {
          Router.push("/");
        }, 2000);
      } else {
        toast.error(result.message || "Signin failed. Please try again.");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl p-6 sm:p-8 lg:p-12 w-full max-w-md sm:max-w-lg transform transition-all h-fit">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          <span className=" text-green-600">Fresh</span>Cart
        </h1>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Welcome Back!
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          Sign in to your account to continue
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <button className="flex items-center justify-center gap-2 border-2 border-gray-200 rounded-lg sm:rounded-xl py-2.5 sm:py-3 px-2 sm:px-4 text-gray-700 font-semibold text-sm sm:text-base hover:border-red-500 hover:bg-red-50 transition-all duration-300">
          <FontAwesomeIcon icon={faGoogle} className="text-lg text-red-500" />
          <span className="hidden sm:inline">Google</span>
        </button>
        <button className="flex items-center justify-center gap-2 border-2 border-gray-200 rounded-lg sm:rounded-xl py-2.5 sm:py-3 px-2 sm:px-4 text-gray-700 font-semibold text-sm sm:text-base hover:border-blue-500 hover:bg-blue-50 transition-all duration-300">
          <FontAwesomeIcon
            icon={faFacebook}
            className="text-lg text-blue-600"
          />
          <span className="hidden sm:inline">Facebook</span>
        </button>
      </div>
      <div className="relative mb-6 sm:mb-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-xs sm:text-sm">
          <span className="px-3 bg-white text-gray-600 font-medium">
            Or continue with email
          </span>
        </div>
      </div>
      <form
        className="space-y-4 sm:space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label
            htmlFor="email"
            className="block text-gray-900 font-semibold mb-2 text-sm sm:text-base"
          >
            Email Address
          </label>
          <div className="relative">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-base sm:text-lg"
            />
            <input
              type="email"
              id="email"
              {...register("email")}
              placeholder="Enter your email"
              className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border-2 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 bg-white text-gray-900 ${
                errors.email
                  ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                  : "border-gray-200 focus:border-green-500 focus:ring-green-100"
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <div className="flex justify-between items-start sm:items-center mb-2 gap-2">
            <label
              htmlFor="password"
              className="block text-gray-900 font-semibold text-sm sm:text-base"
            >
              Password
            </label>
            <Link
              href="/forget-password"
              className="text-green-600 hover:text-green-700 text-xs sm:text-sm font-semibold hover:underline whitespace-nowrap"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <FontAwesomeIcon
              icon={faLock}
              className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-base sm:text-lg"
            />
            <input
              type="password"
              {...register("password")}
              id="password"
              placeholder="Enter your password"
              className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border-2 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 bg-white text-gray-900 ${
                errors.password
                  ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                  : "border-gray-200 focus:border-green-500 focus:ring-green-100"
              }`}
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 sm:gap-3">
            <input
              type="checkbox"
              id="rememberMe"
              {...register("rememberMe")}
              className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-green-500 cursor-pointer"
            />
            <label
              htmlFor="rememberMe"
              className="text-gray-700 font-medium cursor-pointer text-sm sm:text-base"
            >
              Keep me signed in
            </label>
          </div>
          {errors.rememberMe && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              {errors.rememberMe.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 sm:py-3 px-3 sm:px-4 text-sm sm:text-base rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-xl"
        >
          {loading ? (
            <>
              <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
              <span>Signing In...</span>
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faUserPlus} />
              <span>Sign In</span>
            </>
          )}
        </button>
      </form>
      <div className="text-center mt-6 sm:mt-8">
        <p className="text-gray-600 font-medium text-sm sm:text-base">
          {"Don't have an account? "}
          <Link
            href="/signup"
            className="text-green-600 hover:text-green-700 font-bold hover:underline"
          >
            Create one now
          </Link>
        </p>
      </div>
      <div className="border-t border-gray-200 mt-6 sm:mt-8 pt-4 sm:pt-6 flex items-center justify-center sm:justify-between flex-wrap gap-3 sm:gap-4">
        <div className="flex items-center gap-1">
          <FontAwesomeIcon
            icon={faShield}
            className="text-green-600 text-xs sm:text-sm"
          />
          <span className="text-gray-600 text-xs font-semibold">
            SSL Secured
          </span>
        </div>
        <div className="hidden sm:block text-center text-xs">
          <p className="text-gray-600 font-semibold">50K+ Users</p>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-yellow-400 text-xs sm:text-sm">★★★★★</span>
          <span className="text-gray-600 text-xs font-semibold">4.9</span>
        </div>
      </div>
    </div>
  );
}
