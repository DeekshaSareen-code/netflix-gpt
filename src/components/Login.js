import React from "react";
import Header from "./Header";
import { useState } from "react";
const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignInForm = () => {
    setIsSignInForm((prev) => !prev);
  };
  return (
    <div className="">
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/638e9299-0637-42d1-ba39-54ade4cf2bf6/web/CA-en-20250203-TRIFECTA-perspective_219648ef-70c0-4366-bec5-f9dae73ccf74_large.jpg"
          alt="background"
        />
      </div>
      <form className=" rounded-md w-4/12 absolute p-12 my-36 bg-black mx-auto right-0 left-0 text-white bg-opacity-80">
        <h1 className="font-bold text-3xl py-4 ">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-2 my-4 w-full  bg-gray-800 opacity-80"
          ></input>
        )}

        <input
          type="text"
          placeholder="Email Address"
          className="p-2 my-4 w-full bg-gray-800 opacity-80"
        ></input>
        <input
          type="password"
          placeholder="Password"
          className="p-2 my-4 w-full  bg-gray-800 opacity-80"
        ></input>
        <button className="p-2 my-4 bg-red-700 w-full rounded-lg" type="submit">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="p-2 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign up now!"
            : "Already Registered? Sign in now!"}
        </p>
      </form>
    </div>
  );
};

export default Login;
