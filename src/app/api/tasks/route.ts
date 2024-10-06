import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function POST(request: Request){
    try{
        const {task} = await request.json();
        const newTask = await prisma.task.create({
            data:{
                title:task,
                userId:111,
                dueDate: new Date('2024-10-20'),
                done: false,
                projectId:1,
            }
        }) 
        
        return NextResponse.json(newTask);
    }
    catch(error){
        console.error('Error creating task:', error);
        return NextResponse.json({error: 'Failed to create task'}, {status: 500});
    }
}
export async function GET(){
    try{
        const tasks = await prisma.task.findMany({
            // include:{
            //     project: true,
            //     user: true,
            // }
        });
        return NextResponse.json(tasks);
    }
    catch(error){
        console.error('Error creating task:', error);
        return NextResponse.json({error: 'Failed to create task'}, {status: 500});

    }finally{
        await prisma.$disconnect();
    }
}