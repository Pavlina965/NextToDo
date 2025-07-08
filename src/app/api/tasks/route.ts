import prisma from "../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dayjs from "dayjs";

export async function GET(req: NextRequest) {
  const url = new URL(req.url , process.env.NEXTAUTH_URL || "http://localhost:3000");
  const projectId = url.searchParams.get("id") || url.searchParams.get("projectId");
  const isUnassigned = Boolean(url.searchParams.get("unassigned"));
  const showToday = Boolean(url.searchParams.get("showToday"));
      try {
        const session = await getServerSession({secret:process.env.NEXTAUTH_SECRET});
        if (!session || !session.user?.email) {
          return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const user = await prisma.user.findUnique({where:{email: session.user.email}});
        
        if(!user){
                return NextResponse.json({ error: "User not found" }, { status: 404 });
        }


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter:any ={userId: user.id};
    if(projectId && !isNaN(parseInt(projectId))){
      filter.projectId = parseInt(projectId);
    }
     else if(isUnassigned){
      filter.projectId = { equals: null };
     }
     else if(showToday){
  const todayStart = dayjs().startOf("day").toDate(); // 00:00:00
  const todayEnd = dayjs().endOf("day").toDate(); // 23:59:59
  filter.dueDate = {
    gte: todayStart, // Greater than or equal to 00:00:00
    lte: todayEnd,   // Less than or equal to 23:59:59
  };
  console.log(filter);
}

     const tasks = await prisma.task.findMany({where: filter});

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}
export async function  POST(req: NextRequest) {

  try{
    const session = await getServerSession({secret:process.env.NEXTAUTH_SECRET});
    if (!session || !session.user?.email) {
          return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const user = await prisma.user.findUnique({where:{email: session.user.email}});
        if(!user){
                return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
    const data = await req.json();
    const dueDate = data.dueDate? new Date(data.dueDate):null;

    // new Date(data.dueDate).toISOString();
    if(!data.title){
      return NextResponse.json({ error: "Task title is required" }, { status: 400 });
    }
    const newTask = await prisma.task.create({
      data:
      {
        title: data.title,
        description: data.description,
        done: false,
        userId: user.id,
        dueDate: dueDate,
        projectId: data.projectId? parseInt(data.projectId):null
    },
    
    });

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