// import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
// import { login } from "../lib/api.js";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin.js";
import { project_name } from "../constants/name.js";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  //wrap up in a hook
  // const queryClient = useQueryClient();

  // const { mutate, isPending, error } = useMutation({
  //   mutationFn: login,
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  // });

  const {mutate,isPending,error} = useLogin()

  const handleLogin = (e) => {
    e.preventDefault();
    mutate(loginData);
  };

  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="forest"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* login => left side */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* Logo */}
          <div className="mb-4 flex items-center justify-start gap-2">
            <ShipWheelIcon className="size-9 text-primary" />
            <span className="text-3xl font-mono font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              {project_name}
            </span>
          </div>

          {/* error */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response.data.message}</span>
            </div>
          )}

          {/* form */}
          <div className="w-full">
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Welcome back</h2>
                  <p className="text-sm opacity-70">
                    Sign in to your account to continue your journey
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  {/* email */}
                  <div className="form-control w-full space-y-2">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>

                    <input
                      type="email"
                      placeholder="Enter your registered email"
                      className="input input-bordered w-full"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  {/* password */}
                  <div className="form-control w-full space-y-2">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>

                    <input
                      type="password"
                      placeholder="Password"
                      className="input input-bordered w-full"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                      required
                    />
                    
                  </div>

                  {/* submit button */}
                  <button className="btn btn-primary w-full" type="submit" disabled={isPending}>
                    {isPending ? (
                      <>
                      <span className="loading loading-spinner loading-xs"></span>
                      Signing in....
                      </>
                    ) : (
                      "Sign in"
                    )}
                  </button>

                  {/* don't have an account */}
                  <div className="text-center mt-4">
                    <p className="text-sm">
                      Don't have an account?{" "}
                      <Link
                        to="/signup"
                        className="text-primary hover:underline"
                      >
                        Sign Up
                      </Link>
                    </p>
                  </div>

                </div>
              </div>
            </form>

          </div>
        </div>

        {/* login right */}
        {/* SignUp right side */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img
                src="/Video call-bro.png"
                alt="Error"
                className="w-full h-full"
              />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">
                Welcome Back, Terminal Wizard
              </h2>
              <p className="opacity-70">
                Your crew's waiting to ship code and memes.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
