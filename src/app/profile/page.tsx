'use client'

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react"
import toast, { Toaster } from "react-hot-toast";

function profilePage() {
    const router = useRouter();
    const [data, setData] = useState("")

    const logout = async () => {
        try {
            await axios("api/users/logout")
            toast.success('Logout successful')
            console.log("Logout successful");
            router.push('/login')
        } catch (error: any) {
            console.log("Logout error: ", error.message);
            toast.error(error.message);
        }
    }

    const getUserData = async () => {
        try {
            const response = await axios("api/users/profile");
            toast.success('User Data fetched successfully')
            setData(response.data.data._id);
        } catch (error: any) {
            console.log("User Data error: ", error.message);
            toast.error(error.message);
        }
    }

  return (
    <div className="m-4 flex flex-col items-start justify-start min-h-screen py-2">
        <h1 className="text-3xl font-bold tracking-tight">Profile Page</h1>
        <hr />
        <h2 className="text-xl font-semibold mb-4">Get data for the user: {data === "" ? "No data Found" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
        <div className="flex gap-5">
            <button onClick={getUserData} className="bg-green-500 mt-4 transition-opacity text-white font-bold py-2 px-4 rounded">Get User Data</button>
            <button onClick={logout} className="bg-red-500 mt-4 transition-opacity text-white font-bold py-2 px-4 rounded">Logout</button>
        </div>
        <Toaster position="bottom-left"/>
    </div>
  )
}

export default profilePage