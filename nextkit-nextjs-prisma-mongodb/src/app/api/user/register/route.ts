import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const prisma = new PrismaClient();
  try {
    const body = await req.json();
    const { fullname, email, password } = body;

    if (!fullname || !email || !password) {
      return NextResponse.json({ error: 'Please provide all valid fields' }, { status: 400 });
    }
    else {
      const user = await prisma.user.findUnique({
        where: {
          email: email
        }
      });
      if (user) {
        return NextResponse.json({ error: "User already registered!" }, { status: 400 })
      } else {
        // Password Hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Jwt Token
        const secret = process.env.ACCESS_TOKEN_SECRET as string;
        const accessToken = jwt.sign({ fullname, email }, secret, { expiresIn: "1d" });

        await prisma.user.create({
          data: {
            fullname,
            email,
            password: hashedPassword
          },
        });

        const response = NextResponse.json({ fullname, email, message: "User registered successfully!" } , {status:201});
        response.cookies.set({
          name: 'accessToken',
          value: accessToken,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 24,        
        });
        return response;
      }

    }
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}