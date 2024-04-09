"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function loginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const onLogin = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login response: ", response.data);
      toast.success("Login successful");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login error: ", error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (
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
          onClick={onLogin}
          className={`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${
            isButtonDisabled
              ? "opacity-50 cursor-not-allowed"
              : "opacity-100 cursor-pointer"
          }`}
        >
          {isLoading ? "processing..." : "Sign Up"}
        </button>
        <p className="text-center">Don't have an account?<Link href="/signup" className="text-teal-200 underline"> Sign up</Link></p>
      </div>
      <Toaster position="bottom-right"/>
    </div>
  );
}

export default loginPage;
