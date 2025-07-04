import React, { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import {Link} from "react-router"
// import {useMutation, useQueryClient} from "@tanstack/react-query"
// import { axiosInstance } from "../lib/axios.js";
// import { signup } from "../lib/api.js";
import useSignup from "../hooks/useSignup.js";
import { project_name } from "../constants/name.js";

const SignUpPage = () => {

  const [ signUpData, setSignUpData ] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  //now the aim is : if the user give all the required fields then
  //then sending a post request from frontend to the server
  //if the user is created, then we can update the authUser field mentioned in App.jsx

  //wrap this inside a custom hook
  // const queryClient = useQueryClient()

  // const {mutate,isPending,error} = useMutation({
  //   mutationFn : signup,
  //   onSuccess : ()=> queryClient.invalidateQueries({queryKey : ["authUser"]})
  // })
  //now to run this, we can use mutate

  const {mutate,isPending,error} = useSignup()

  const handleSignUp = (e) => {
    e.preventDefault();
    mutate(signUpData)
  };

  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="forest"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">

        {/* SignUp => left side */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* logo */}
          <div className="mb-4 flex items-center justify-start gap-2">
            <ShipWheelIcon className="size-9 text-primary" />
            <span className="text-3xl font-mono font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              {project_name}
            </span>
          </div>
          {/* Error msg if any */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response.data.message}</span>
            </div>
          )}
          {/* form */}
          <div className="w-full">
            <form onSubmit={handleSignUp}>

              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Create an Account</h2>
                  <p className="text-sm opacity-70">Join {project_name} and connect with others</p>
                </div>

                <div className="space-y-3">
                  {/* fullName */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Full Name</span>
                    </label>

                    <input type="text" 
                      placeholder="What should we call you?"
                      className="input input-bordered w-full"
                      value={signUpData.fullName}
                      onChange={(e)=>setSignUpData({...signUpData,fullName : e.target.value})}
                      required
                    />
                  </div>
                  {/* email */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>

                    <input type="email" 
                      placeholder="Enter your email"
                      className="input input-bordered w-full"
                      value={signUpData.email}
                      onChange={(e)=>setSignUpData({...signUpData,email:e.target.value})}
                      required
                    />
                  </div>
                  {/* password */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>

                    <input type="password" 
                      placeholder="Password"
                      className="input input-bordered w-full"
                      value={signUpData.password}
                      onChange={(e)=>setSignUpData({...signUpData,password:e.target.value})}
                      required
                    />
                    <p className="text-xs opacity-70 mt-1">
                      Password must be atleast 6 characters long
                    </p>
                  </div>

                   <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-2">
                      <input type="checkbox" className="checkbox checkbox-sm" required />
                      <span className="text-xs leading-tight">
                        I agree to the{" "}
                        <span className="text-primary hover:underline">terms of service</span> and{" "}
                        <span className="text-primary hover:underline">privacy policy</span>
                      </span>
                    </label>
                  </div>

                </div>

                {/* submit button */}
                <button className="btn btn-primary w-full" type="submit">
                  {/* Create Account */}
                  {/* modifying the button */}
                  {isPending ? (
                    <>
                      <span className="loading loading-spinner loading-xs"></span>
                      Loading....
                    </>
                  ) : "Create Account"}
                  </button>
                {/* already have account */}
                <div className="text-center mt-4">
                  <p className="text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary hover:underline">
                      Sign In
                    </Link>
                  </p>
                </div>

              </div>
              
            </form>
          </div>
        </div>

        {/* SignUp right side */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src="/Video call-bro.png" alt="Error" className="w-full h-full" />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">Welcome to {project_name}</h2>
              <p className="opacity-70">
                Built for developers. Powered by vibes.
                
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SignUpPage;
