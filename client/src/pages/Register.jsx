import { useForm } from "react-hook-form";
import { useState } from "react";
import axiosInstance from "../services/axiosInstance";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = async (data) => {
    try {
      setServerError("");
      setSuccess("");

      await axiosInstance.post("/api/user/register", data);

      setSuccess("Account created successfully. Please login.");
    } catch (err) {
      setServerError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black px-4">
      <div className="w-full max-w-md border border-black/10 rounded-xl p-8 shadow-sm">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-center mb-2">
          Create Account
        </h1>
        <p className="text-sm text-black/60 text-center mb-6">
          Sign up to get started
        </p>

        {/* Error */}
        {serverError && (
          <div className="mb-4 text-sm text-red-600 border border-red-200 p-2 rounded">
            {serverError}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="mb-4 text-sm text-green-600 border border-green-200 p-2 rounded">
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="John Doe"
              {...register("name", { required: "Name is required" })}
              className="w-full border border-black/20 rounded-md px-3 py-2 outline-none focus:border-black transition"
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="john@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full border border-black/20 rounded-md px-3 py-2 outline-none focus:border-black transition"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Minimum 6 characters"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters required",
                },
              })}
              className="w-full border border-black/20 rounded-md px-3 py-2 outline-none focus:border-black transition"
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white py-2 rounded-md hover:bg-black/90 transition disabled:opacity-50"
          >
            {isSubmitting ? "Creating account..." : "Register"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs text-center text-black/60 mt-6">
          Already have an account?{" "}
          <span className="underline cursor-pointer">Login</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
