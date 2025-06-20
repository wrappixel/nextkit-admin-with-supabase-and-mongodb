import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try{
        const cookieStore = await cookies();
        cookieStore.delete("accessToken");
        return NextResponse.json({message:"User Logged out successfully!"},{status:200})
    }catch(error){
       return NextResponse.json({error:"Internal server error"},{status:500})
    }
}