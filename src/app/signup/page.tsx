"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function SignupPage() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const onSignUp = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup response: ", response.data);
      toast.success("Signup successful");
      router.push("/login");
    } catch (error: any) {
      console.log("Signup error: ", error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-[450px] min-h-[320px] bg-teal-500 p-4 rounded-lg shadow-lg text-white">
        <h1 className="text-center text-3xl tracking-tight font-semibold mb-2">
          Sign<span className="text-teal-200">Up</span>
        </h1>
        <hr />
        <label htmlFor="username">Username</label>
        <input
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          id="username"
          className="w-full border border-gray-300 p-2 rounded-lg mt-2 mb-2 focus:outline-none focus:border-teal-600 text-black"
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          id="email"
          className="w-full border border-gray-300 p-2 rounded-lg mt-2 mb-2 focus:outline-none focus:border-teal-600 text-black"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          id="password"
          className="w-full border border-gray-300 p-2 rounded-lg mt-2 mb-2 focus:outline-none focus:border-teal-600 text-black"
        />
        <button
          onClick={onSignUp}
          className={`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${
            isButtonDisabled
              ? "opacity-50 cursor-not-allowed"
              : "opacity-100 cursor-pointer"
          }`}
        >
          {isLoading ? "processing..." : "Sign Up"}
        </button>
        <p className="text-center">Already have an account?<Link href="/login" className="text-teal-200 underline"> Login</Link></p>
      </div>
      <Toaster position="bottom-right"/>
    </div>
  );
}

export default SignupPage;
