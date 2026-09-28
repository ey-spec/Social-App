import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { showSuccessToast, showErrorToast } from "../lib/toast";
import {
  RegisterSchema,
  type RegisterFormData,
} from "../schemas/Register.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function RegisterForm() {
  const form = useForm<RegisterFormData>({
    defaultValues: {
      name: "",
      email: "",
      dateOfBirth: "",
      gender: "male",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(RegisterSchema),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields },
    // watch,
  } = form;

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(data: RegisterFormData) {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "https://route-posts.routemisr.com/users/signup",
        data,
      );
      console.log("Success:", response.data);
      showSuccessToast("Account created successfully!");
      reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showErrorToast(
          error.response?.data?.message ||
            "Registration failed. Please try again.",
        );
      } else {
        showErrorToast("Something went wrong.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-gray-200/60 border border-gray-100 p-8">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-1">
          Register Now
        </h1>
        <p className="text-sm text-center text-gray-500 mb-8">
          Create your account to get started
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              {...register(
                "name",
                //   {
                //   required: { value: true, message: "Name is required" },
                //   minLength: {
                //     value: 3,
                //     message: "Name must be at least 3 characters",
                //   },
                // }
              )}
              id="name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer transition-colors"
              placeholder=" "
            />
            <label
              htmlFor="name"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter your name
            </label>
            {errors.name && touchedFields.name && (
              <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="email"
              {...register(
                "email",
                //   {
                //   required: { value: true, message: "Email is required" },
                //   pattern: {
                //     value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                //     message: "Enter a valid email address",
                //   },
                // }
              )}
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
              type="date"
              {...register(
                "dateOfBirth",
                //   {
                //   required: { value: true, message: "Date of birth is required" },
                //   validate: (value) => {
                //     const birthDate = new Date(value);
                //     const today = new Date();

                //     let age = today.getFullYear() - birthDate.getFullYear();
                //     const hasHadBirthdayThisYear =
                //       today.getMonth() > birthDate.getMonth() ||
                //       (today.getMonth() === birthDate.getMonth() &&
                //         today.getDate() >= birthDate.getDate());

                //     if (!hasHadBirthdayThisYear) age--;

                //     return age >= 18 || "You must be at least 18 years old";
                //   },
                // }
              )}
              id="dateofbirth"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer transition-colors"
              placeholder=" "
            />
            <label
              htmlFor="dateofbirth"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Date of birth
            </label>
            {errors.dateOfBirth && touchedFields.dateOfBirth && (
              <p className="mt-1 text-xs text-red-600">
                {errors.dateOfBirth.message}
              </p>
            )}
          </div>

          <div className="w-full mb-6">
            <label
              htmlFor="gender"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <select
              id="gender"
              {...register(
                "gender",
                //   {
                //   required: { value: true, message: "Please select a gender" },
                // }
              )}
              className="block w-full px-3 py-2.5 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-600 transition-colors"
            >
              <option selected value="" disabled>
                Choose gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && touchedFields.gender && (
              <p className="mt-1 text-xs text-red-600">
                {errors.gender.message}
              </p>
            )}
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="password"
              {...register(
                "password",
                //   {
                //   required: { value: true, message: "Password is required" },
                //   minLength: {
                //     value: 8,
                //     message: "Password must be at least 8 characters",
                //   },
                //   pattern: {
                //     value:
                //       /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/,
                //     message:
                //       "Password must include an uppercase letter, a lowercase letter, and a special character",
                //   },
                // }
              )}
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

          <div className="relative z-0 w-full mb-8 group">
            <input
              type="password"
              {...register(
                "rePassword",
                //   {
                //   required: {
                //     value: true,
                //     message: "Please confirm your password",
                //   },
                //   validate: (value) =>
                //     value === watch("password") || "Passwords do not match",
                // }
              )}
              id="rePassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer transition-colors"
              placeholder=" "
            />
            <label
              htmlFor="rePassword"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Retype your password
            </label>
            {errors.rePassword && touchedFields.rePassword && (
              <p className="mt-1 text-xs text-red-600">
                {errors.rePassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 focus:ring-4 focus:ring-indigo-200 font-medium rounded-lg text-sm px-4 py-3 transition-colors focus:outline-none shadow-sm shadow-indigo-200"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}
