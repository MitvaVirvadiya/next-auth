'use client'
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function verifyEmailPage() {
  const [token, setToken] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyEmail = async () => {
    try {
      await axios.post("api/users/verifyemail", { token });
      toast.success("Email verified successfully");
      setIsVerified(true);
    } catch (error: any) {
      setError(true);
      console.log("Verify email error", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const token = window.location.search.split("=")[1];
    setToken(token);
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className="m-4 flex flex-col items-start justify-start min-h-screen py-2">
      <h1 className="text-3xl font-bold my-2">
        {isVerified
          ? "Email verified successfully"
          : "Email verification failed"}
      </h1>
      <h2 className="p-2 bg-teal-500 rounded-md 
      text-white my-1">
        {token ? "Token: " + token : "No Token"}
      </h2>

      {isVerified && (
        <div className="my-4">
          <h2 className="text-2xl">Email Verified</h2>
          <p className="text-md mt-2">You can now login, <Link href="/login">Login</Link></p>
        </div>
      )}

      {error && <h2 className="text-md text-red-500 mt-1">Verification Failed</h2>}
      <Toaster position="bottom-right"/>
    </div>
  );
}

export default verifyEmailPage;
