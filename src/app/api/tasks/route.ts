import prisma from "../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const dataId = url.searchParams.get("id");
    
      try {
        const session = await getServerSession({secret:process.env.NEXTAUTH_SECRET});
        if (!session) {
          return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        
    if (dataId) {
      const task = await prisma.task.findUnique({
        where: { id: parseInt(dataId) },
      });
      if (!task) {
        return NextResponse.json({ error: "Task not found" }, { status: 404 });
      }
      return NextResponse.json(task, { status: 200 });
    } else {
      if(session.user){

        const tasks = await prisma.task.findMany({
          where: { userId: parseInt(session.user.id) },
        });
        
        return NextResponse.json(tasks, { status: 200 });
      }
      else{
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
}
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}

export async function  POST(req: NextRequest) {
  try{
    const data = await req.json();
const dueDate = new Date(data.dueDate).toISOString();
    if(!data.title){
      return NextResponse.json({ error: "Task title is required" }, { status: 400 });
    }

    const newTask = await prisma.task.create({
      data:
      {
        title: data.title,
        description: data.description,
        done: false,
        userId: 0,
        dueDate: new Date(dueDate),
    },
    });
    console.log("Data received by API:", data.dueDate);
console.log("Converted to Date:", new Date(data.dueDate));
console.log("Task saved to DB:", newTask.dueDate);
    // console.log(newTask.dueDate);
    return NextResponse.json(newTask, {status: 201});
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}
export async function PUT (req: NextRequest){
  const url = new URL(req.url);
  const dataId = url.searchParams.get("id");
  try{
    if(!dataId){
      return NextResponse.json({ error: "Task id is required" }, { status: 400 });
    }
    const {...data} = await req.json();
    const updatedTask = await prisma.task.update({
      where:{id: parseInt(dataId)},
      data: data,
    });
    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
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
    return NextResponse.json(deletedTask, { status: 200 });
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
  }
}