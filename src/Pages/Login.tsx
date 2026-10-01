import { useForm } from "react-hook-form";
import axios from "axios";
import { showSuccessToast, showErrorToast } from "../lib/toast";
import { loginSchema, type LoginFormData } from "../schemas/Login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function LoginForm() {
  const form = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitting },
  } = form;

  const navigate = useNavigate();

  const { UserToken, setUserToken } = useContext(AuthContext);

  async function onSubmit(data: LoginFormData) {
    try {
      const { data: res } = await axios.post(
        "https://route-posts.routemisr.com/users/signin",
        data,
      );
      localStorage.setItem("UserToken", res.data.token);
      setUserToken(localStorage.getItem("UserToken"));
      showSuccessToast(res.message || "Welcome back!");
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showErrorToast(
          error.response?.data?.message || "Login failed. Please try again.",
        );
      } else {
        showErrorToast("Something went wrong.");
      }
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-gray-200/60 border border-gray-100 p-8">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-1">
          Login Now
        </h1>
        <p className="text-sm text-center text-gray-500 mb-8">
          Enter your account
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="email"
              {...register("email")}
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer transition-colors"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
            {errors.email && touchedFields.email && (
              <p className="mt-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="password"
              {...register("password")}
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer transition-colors"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your password
            </label>
            <ul className="mt-1.5 text-xs text-gray-400 space-y-0.5">
              <li>At least 8 characters</li>
              <li>One uppercase and one lowercase letter</li>
              <li>One special character</li>
            </ul>
            {errors.password && touchedFields.password && (
              <p className="mt-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 focus:ring-4 focus:ring-indigo-200 font-medium rounded-lg text-sm px-4 py-3 transition-colors focus:outline-none shadow-sm shadow-indigo-200"
          >
            {isSubmitting ? "Entering account..." : "Sign in"}
          </button>
          <p className="mt-6 text-sm text-center text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
