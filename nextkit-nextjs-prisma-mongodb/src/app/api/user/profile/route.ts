import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
export  async function PUT(req:NextRequest){
    try{
       const {fullname , email , password} = await req.json();
        if(fullname && email && password){
            const envrironment = process.env.NODE_ENV;
            console.log(envrironment)
            if(envrironment === "development"){
              const user = await prisma.user.findUnique({
                where:{
                    email:email
                }
              });
              if(user){
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password , salt)
                const updatedUser = await prisma.user.update({
                    where:{ email},
                     data:{
                            fullname,
                            email,
                            password: hashedPassword
                        }
                });
                return NextResponse.json({data:updatedUser},{status:200})
              }else{
                 return NextResponse.json({error:"User not found!"},{status:400})
              }
            }else{
                return NextResponse.json({error:"Modification not allowed in demo mode!"},{status:400})
            }
        }else{
            return NextResponse.json({error:"Please provide all valid fields!"},{status:400})
        }
    }catch(error){
        return NextResponse.json({error:"Internal server error!"},{status:500})
    }
}