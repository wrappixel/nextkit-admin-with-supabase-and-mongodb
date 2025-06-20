import { NextRequest, NextResponse } from "next/server";

const salesInfo = {
  "8months": {
    categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    series: [
      { name: 'Prev Month', data: [480, 520, 610, 500, 580, 630, 450, 590] },
      { name: 'Current Month', data: [550, 590, 700, 610, 660, 720, 500, 670] }
    ]
  },
"6months": {
  categories: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  series: [
    { name: 'Prev Month', data: [610, 500, 580, 630, 450, 590] },
    { name: 'Current Month', data: [700, 610, 660, 720, 500, 670] }
  ]
}
,
  "4months": {
    categories: ['Jun', 'Jul', 'Aug', 'Sep'],
    series: [
      { name: 'Prev Month', data: [580, 630, 450, 590] },
      { name: 'Current Month', data: [660, 720, 500, 670] }
    ]
  }
}

export async function GET(req:NextRequest){
    try{
       return NextResponse.json({data:salesInfo , message:"Succesfully fetched sales information!"},{status:200})
    }catch(error){
        return NextResponse.json({error:"Internal server error"},{status:500})
    }
}