import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/db/dbConfig";
import User from "@/models/user.model";
import { getDataFromToken } from "@/utils/getDataFromToken";

connectDB();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request)

        const user = await User.findOne({_id: userId}).select("-password")
        if(!user){
            return NextResponse.json({error: "User not found due to invaild token"}, {status: 404})
        }

        return NextResponse.json({message: "user data fetched successfully", data: user}, {status: 200})

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}