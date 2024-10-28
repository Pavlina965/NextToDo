import prisma from "../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const dataId = url.searchParams.get("id");
    if (dataId) {
      try{
        const task = await prisma.task.findUnique({
          where: { id: parseInt(dataId) },
        });
        if(!task){
          return NextResponse.json({ error: "Task not found" });
        }
        return NextResponse.json(task,);
      }catch(error){
        return NextResponse.json({ error });
      }
    }
      else{
        try{
    
          const tasks = await prisma.task.findMany();
          return NextResponse.json(tasks)
        
        } catch (error) {
          return NextResponse.json({ error});  }
        }
      }
export async function  POST(req: NextRequest) {
  try{
    const data = await req.json();
    const newTask = await prisma.task.create({
      data:{
        title: data.title,
        userId: 0,
    },
    });
    return NextResponse.json(newTask, {status: 201});
  }
  catch(error){
    return NextResponse.json({ error}, { status: 500 });  }
}
export async function PUT (req: NextRequest){
  try{
    const url = new URL(req.url);
    const dataId = url.searchParams.get("id");
    if(!dataId){
      return NextResponse.json({ error: "Task id is required" }, { status: 400 });
    }
    const {...data} = await req.json();
    const updatedTask = await prisma.task.update({
      where:{id: parseInt(dataId)},
      data: data,
    });
    return NextResponse.json(updatedTask);
  }
  catch(error){
    return NextResponse.json({ error}, { status: 500 });
  }
}
export async function DELETE (req: NextRequest){
  
  try{
    const url = new URL(req.url);
    const dataId = url.searchParams.get("id");
    if(!dataId){
      return NextResponse.json({ error: "Task id is required" }, { status: 400 });
    }
    const deletedTask = await prisma.task.delete({
      where: { id: parseInt(dataId) },
    });
    return NextResponse.json(deletedTask);
  }
  catch(error){
    return NextResponse.json({ error}, { status: 500 });
    // return console.log(error)
  }
}