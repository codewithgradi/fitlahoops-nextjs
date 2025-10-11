import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { prismaRetry } from "@/lib/prismaRetry"
import bcrypt from 'bcrypt'


export async function GET(req:Request) {
    const body = await req.json()
    const { id } = await body
    const admin = await prisma.admin.findUnique({
        where :{id:(id)}
    })
    if (!admin) return NextResponse.json({ message: "No Admin" })
    
    return NextResponse.json(admin)
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {

  const body = await req.json()
  try {
    const { username, password } = body

    if (!username || !password) return NextResponse.json(
    
      { message: "Username and password are required" },
        
      { status: 400 }
        
      );
    
    const admin = await prismaRetry(()=> prisma.admin.findFirst({where:{username:username}}),5,1000)
    
    if (!admin) return NextResponse.json({ message: "Invalid Credentials" }, { status: 401 })
    
    const hashedPassword = await bcrypt.hash(password, 10)
    
    await prisma.admin.update({

      where: { id: (admin.id) },

      data : {password:hashedPassword}
    })
    
    return NextResponse.json({message:"Password updated successfully"},{status:200})
    
    
  } catch (err: unknown) {

    let errorMessage = "Unknown error";

    if (err instanceof Error) errorMessage = err.message;
    
    return NextResponse.json({ error: `Error: ${errorMessage}` }, { status: 500 });
    
  }
}