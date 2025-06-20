import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
    const prisma = new PrismaClient();
    try {
        const { email, password } = await req.json();
        if (!email || !password) {
            return NextResponse.json({ error: "All valid fields are required!" }, { status: 400 })
        } else {
            const user = await prisma.user.findUnique({
                where: {
                    email
                }
            });
            if (user) {
                const isValidPassword = await bcrypt.compare(password, user.password);
                if (isValidPassword) {
                    const secret = process.env.ACCESS_TOKEN_SECRET as string;
                    const accessToken = jwt.sign({ fullname: user.fullname, email: user.email }, secret);
                    const response = NextResponse.json({ fullname: user.fullname, email: user.email , message:"User logged in successfully!" }, { status: 201 });
                    response.cookies.set({
                        name: "accessToken",
                        value: accessToken,
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        maxAge: 60 * 60 * 24,
                    });
                    return response
                } else {
                    return NextResponse.json({ error: 'Email/Password is incorrect!' }, { status: 404 });
                }
            } else {
                return NextResponse.json({ error: 'User not registered!' }, { status: 404 });
            }
        }
    } catch (error) {
        console.error('Error logging user:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}