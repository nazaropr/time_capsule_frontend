import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { apiFetch } from "@/lib/api";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

export default function SignUpForm() {
  const router = useRouter();
  let {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>();
  const [serverError, setServerError] = useState("");

  const onSubmit = async (data: SignUpFormData) => {
    try {
      setServerError("");

      await apiFetch("/auth/sign-up", {
        method: "POST",
        body: JSON.stringify(data),
      });

      router.push("/sign-in");
      router.refresh();
    } catch (e) {
      if (e instanceof Error) {
        setServerError(e.message);
      } else {
        setServerError("Something went wrong");
      }
    }
  };

  return (
    <div className="auth-card">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
          Join Us
        </h1>
        <p className="text-slate-400">Create your account to start storing memories</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">
            Full Name
          </label>
          <input
            type="text"
            placeholder="John Doe"
            className="input-field"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-destructive ml-1">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="name@example.com"
            className="input-field"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-destructive ml-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="input-field"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Minimum 8 characters",
              },
            })}
          />
          {errors.password && (
            <p className="mt-1 text-xs text-destructive ml-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {serverError && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm text-center">
            {serverError}
          </div>
        )}

        <button disabled={isSubmitting} className="btn-primary mt-4">
          {isSubmitting ? (
            <span className="flex items-center">
               <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating account...
            </span>
          ) : (
            "Create Account"
          )}
        </button>

        <p className="text-center text-sm text-slate-400 mt-6">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
          >
            Sign in here
          </Link>
        </p>
      </form>
    </div>
  );
}
