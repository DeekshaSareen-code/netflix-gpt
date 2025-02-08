// @ts-nocheck
import React, { useRef } from "react";
import Header from "./Header";
import { useState } from "react";
import checkValidData from "../utils/validate";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm((prev) => !prev);
  };
  const handleButtonClick = () => {
    const message = checkValidData(
      email.current.value,
      password.current.value,
      isSignInForm ? "" : name.current?.value
    );
    setErrorMessage(message);

    if (message) return;

    // TODO: Add Firebase authentication logic here
    // Sign in or Sign up logic based on isSignInForm state
    if (!isSignInForm) {
      // Sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL:
              "https://occ-0-171-90.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABYTJSJ0e98RxCgAE4x6tsnkLrFoWNWQh3rZl-80iwlihbPBgBuSV4pF8FnZjDz8Ynb1xVSyqA3LlVE0oxAIu079j-eqCa94.png?r=ce4",
          });
        })
        .then(() => {
          const { uid, email, displayName, photoURL } = auth.currentUser;
          dispatch(
            addUser({
              uid: uid,
              email: email,
              displayName: displayName,
              photoURL: photoURL,
            })
          );
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          alert("Signed in successfully");
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.errorCode + "-" + error.errorMessage;
          const errorMessage = error.errorMessage;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
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
      <form
        onSubmit={(e) => e.preventDefault()}
        className="rounded-md w-3/12 absolute p-12 my-36 bg-black mx-auto right-0 left-0 text-white bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4 ">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-2 my-4 w-full  bg-gray-800 opacity-80"
          ></input>
        )}

        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-2 my-4 w-full bg-gray-800 opacity-80"
        ></input>
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-2 my-4 w-full  bg-gray-800 opacity-80"
        ></input>
        <p className="text-red-500 text-lg">{errorMessage}</p>
        <button
          className="p-2 my-4 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
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
