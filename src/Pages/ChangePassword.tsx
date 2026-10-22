import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  ChangePasswordSchema,
  type ChangePasswordFormData,
} from "../schemas/ChangePass.schema";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { showErrorToast, showSuccessToast } from "../lib/toast";

export default function ChangePassword() {
  const { setUserToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitting },
  } = useForm({
    defaultValues: {
      password: "",
      newPassword: "",
    },
    resolver: zodResolver(ChangePasswordSchema),
  });

  function changePassword(values: ChangePasswordFormData) {
    return axios.patch(
      "https://route-posts.routemisr.com/users/change-password",
      { password: values.password, newPassword: values.newPassword },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("UserToken")}`,
        },
      },
    );
  }

  const { mutate, isPending } = useMutation({
    mutationFn: changePassword,
    onSuccess: (res) => {
      localStorage.setItem("UserToken", res.data.data.token);
      setUserToken(res.data.data.token);
      showSuccessToast(res.data.message || "Password updated");
      navigate("/profile");
    },
    onError: (err) => {
      showErrorToast(
        axios.isAxiosError(err)
          ? err.response?.data?.message || err.message
          : "Something went wrong.",
      );
    },
  });

  function onSubmit(values: ChangePasswordFormData) {
    mutate(values);
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-gray-200/60 border border-gray-100 p-8">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-1">
          Change Password
        </h1>
        <p className="text-sm text-center text-gray-500 mb-8">
          Enter your current and new password
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="relative z-0 w-full mb-6">
            <input
              type="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer transition-colors"
              placeholder=" "
              {...register("password")}
            />
            <label
              htmlFor="password"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Current password
            </label>
            {errors.password && touchedFields.password && (
              <p className="mt-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="relative z-0 w-full mb-6">
            <input
              type="password"
              id="newPassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer transition-colors"
              placeholder=" "
              {...register("newPassword")}
            />
            <label
              htmlFor="newPassword"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              New password
            </label>
            <ul className="mt-1.5 text-xs text-gray-400 space-y-0.5">
              <li>At least 8 characters</li>
              <li>One uppercase and one lowercase letter</li>
              <li>One special character</li>
            </ul>
            {errors.newPassword && touchedFields.newPassword && (
              <p className="mt-1 text-xs text-red-600">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div className="relative z-0 w-full mb-6">
            <input
              type="password"
              id="confirmPassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer transition-colors"
              placeholder=" "
              {...register("confirmPassword")}
            />
            <label
              htmlFor="confirmPassword"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Confirm new password
            </label>
            {errors.confirmPassword && touchedFields.confirmPassword && (
              <p className="mt-1 text-xs text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 focus:ring-4 focus:ring-indigo-200 font-medium rounded-lg text-sm px-4 py-3 transition-colors focus:outline-none shadow-sm shadow-indigo-200"
          >
            {isPending ? "Updating Password..." : "Update Password"}
          </button>

          <p className="mt-6 text-sm text-center text-gray-500">
            <Link
              to="/profile"
              className="font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
            >
              Back to profile
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
