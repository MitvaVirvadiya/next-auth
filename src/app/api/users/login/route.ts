import { connectDB } from "@/db/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connectDB()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        const user = await User.findOne({email})

        if(!user){
           return NextResponse.json({error: "Email already exists"}, {status: 400}) 
        }
        
        const validPassword = await bcryptjs.compare(password, user.password)
        
        if(!validPassword){
            return NextResponse.json({error: "Password is incorrect"}, {status: 400}) 
        }

        const tokenData = {
            id: user._id
        }

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET!, {expiresIn: "1d"})

        const response =  NextResponse.json({message: "user login successfully", success: true}, {status: 200})

        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response
        
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}