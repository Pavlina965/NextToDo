import { parse } from "path";
import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){
  try {
    const tasks = await prisma.task.findMany();
    return NextResponse.json(tasks, { status: 200 })
    
  } catch (error) {
    return NextResponse.json({ error: "Error fetching tasks" }, { status: 500 });  }
}

export async function  POST(req: Request) {
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
    return NextResponse.json({ error: "Error creating tasks" }, { status: 500 });  }
}
export async function PUT (req:NextResponse){
  try{
    const {searchParams} = new URL(req.url);
    const id = searchParams.get("id");

    if(!id){
      return NextResponse.json({ error: "Task id is required" }, { status: 400 });
    }
    const {title} = await req.json();

    const updatedTask = await prisma.task.update({
      where:{id: parseInt(id)},
      data:{
        title
      },
    });
    return NextResponse.json(updatedTask);
  }
  catch(error){
    return NextResponse.json({ error: "Error updating task" }, { status: 500 });
  }
}
export async function DELETE (req:NextResponse){
  try{
    const {searchParams} = new URL(req.url);
    const id = searchParams.get("id");
    if(!id){
      return NextResponse.json({ error: "Task id is required" }, { status: 400 });
    }
    const deletedTask = await prisma.task.delete({
      where:{id: parseInt(id)},
    });
    return NextResponse.json(deletedTask);
  }
  catch(error){
    return NextResponse.json({ error: "Error deleting task" }, { status: 500 });
  }
}