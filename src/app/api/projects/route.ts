import { getServerSession } from "next-auth";
import prisma from "../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const dataId = url.searchParams.get("id");
    
      try {
        const session = await getServerSession({secret:process.env.NEXTAUTH_SECRET});
        if (!session || !session.user?.email) {
          return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const user = await prisma.user.findUnique({where:{email: session.user.email}});
        if(!user){
          return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        if (dataId) {
      const project = await prisma.project.findUnique({
        where: { id: parseInt(dataId) },
        include: {
          users: { where: { user_id: user.id } },
        },
      });

      if (!project) {
        return NextResponse.json({ error: "Project not found" }, { status: 404 });
      }

      return NextResponse.json(project, { status: 200 });
    }

    // If no dataId, fetch all projects for the user
    const projects = await prisma.project.findMany({
      where: {
        users: {
          some: {
            user_id: user.id,
          },
        },
      },
    });

    return NextResponse.json(projects || [], { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}
export async function POST(req: NextRequest) {
  try {
  const session = await getServerSession({secret:process.env.NEXTAUTH_SECRET});
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });}
  const user = await prisma.user.findUnique({where:{email: session.user.email}});
  if(!user){
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  const data = await req.json();
  if(!data.title){
    return NextResponse.json({ error: "Project title is required" }, { status: 400 });}
  const newProject = await prisma.project.create({
    data: {
      title: data.title,
      description: data.description || "",
      creation_date: new Date(),
      users: {
        create: {
          user_id: user.id,
        },
      },
    }
  })
  return NextResponse.json(newProject, {status: 201});
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}