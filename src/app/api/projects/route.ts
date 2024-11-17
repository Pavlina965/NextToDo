import prisma from "../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const dataId = url.searchParams.get("id");
    
      try {
    if (dataId) {
      const task = await prisma.project.findUnique({
        where: { id: parseInt(dataId) },
      });
      if (!task) {
        return NextResponse.json({ error: "Project not found" }, { status: 404 });
      }
      return NextResponse.json(task, { status: 200 });
    } else {
      const tasks = await prisma.project.findMany();
      return NextResponse.json(tasks, { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}