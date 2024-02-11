import User from "@/models/User"
import connect from "@/utils/db"
import bcrypt from "bcrypt"

import { NextResponse } from "next/server"

export const POST = async (request:any) =>{

    const {email, password} = await request.json();
    //connect to db after getting email and password
    await connect()

//checking if user existed in db or not
const existingUser = await User.findOne({ email });

if (existingUser) {
    return new NextResponse("Email is already in use", { status: 400 });
  }

  //if user doesn't exist, we will move forward and hash the password to store
  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = new User({
    email,
    password: hashedPassword,
  });

    try{

    }catch(err:any){
        return new NextResponse(err,{
            status: 500,
        })
    }

}