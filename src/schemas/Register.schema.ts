import * as zod from "zod";

export const RegisterSchema = zod
  .object({
    name: zod
      .string()
      .nonempty("Name is required")
      .min(3, "Name must be at least 3 characters"),
    email: zod
      .email()
      .nonempty("Email is required")
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email address"),
    dateOfBirth: zod.string().refine((dateOfBirthValue) => {
      const today = new Date();
      today.setFullYear(today.getFullYear() - 18);
      return new Date(dateOfBirthValue) <= today;
    }, "You must be at least 18 years old"),
    gender: zod.enum(["male", "female"], "Gender must be male or female"),
    password: zod
      .string()
      .nonempty("Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/,
        "Password must include an uppercase letter, a lowercase letter, and a special character",
      ),
    rePassword: zod.string().nonempty("rePassword is required"),
  })
  .refine((values) => values.password === values.rePassword, {
    error: "Passwords must match",
    path: ["rePassword"],
  });

  export type RegisterFormData = zod.infer<typeof RegisterSchema>;
