
import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const products = await prisma.product.findMany();

    return NextResponse.json({
      data: products,
      message: "Products fetched successfully",
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({
      error: error,
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {

  try {
    const body = await req.json();
    const { name, customer, quantity , status , price , imageUrl } = body;

    if (!name || !customer || !quantity || !status || !price || !imageUrl) {
      return NextResponse.json({ error: 'Please provide all valid fields' }, { status: 400 });
    }
    else {
      const response = await prisma.product.create({
        data:{
                name, customer, quantity , status , price , imageUrl
            }
      })
      return NextResponse.json({data:response},{status:201})

    }
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Internal Server Error' , errordata:error }, { status: 500 });
  }
}

export async function PUT(req:NextRequest){
  try{
    const envrironment = process.env.NODE_ENV;
    if(envrironment === "development"){
      const {name , customer , quantity , status , price , imageUrl,id} = await req.json();
      if(name && customer && quantity && status && price && imageUrl && id){
        const updatedProduct = await prisma.product.update({
          where:{
            id:id
          },
          data:{
            name , customer , quantity , status , price , imageUrl
          }
        });

       return NextResponse.json({data:updatedProduct,msg:"Product edited successfully!"},{status:200});
      }else{
         return NextResponse.json({ error: 'Please provide all valid fields' }, { status: 400 });
      }
    
    }else{
      return NextResponse.json({error:"Modification not allowed in demo mode!"},{status:400})
    }
  }catch(error){
    return NextResponse.json({error:"Internal server error"},{status:500})
  }
}

export async function DELETE(req:NextRequest){
  try{
    const envrironment = process.env.NODE_ENV;
    if(envrironment === "development"){
      return NextResponse.json({data:"Product deleted successfully!"},{status:200})
    }else{
      return NextResponse.json({error:"Modification not allowed in demo mode!"},{status:400})
    }
  }catch(error){
    return NextResponse.json({error:"Internal server error"},{status:500})
  }
}