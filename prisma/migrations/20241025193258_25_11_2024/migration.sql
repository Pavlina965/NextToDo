-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(1000),
    "done" BOOLEAN NOT NULL DEFAULT false,
    "dueDate" DATE,
    "completion_date" TIMESTAMP(3),
    "status" TEXT,
    "priority" INTEGER,
    "predicted_duration" INTEGER,
    "actual_duration" INTEGER,
    "pomodoro_cycles" INTEGER,
    "progress" INTEGER DEFAULT 0,
    "projectId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reccuring_task" (
    "id" SERIAL NOT NULL,
    "taskId" INTEGER NOT NULL,
    "interval" TEXT NOT NULL,
    "nextRun" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reccuring_task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "creation_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" VARCHAR(255),
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "colour" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task_Tag" (
    "task_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,

    CONSTRAINT "Task_Tag_pkey" PRIMARY KEY ("task_id","tag_id")
);

-- CreateTable
CREATE TABLE "User_Project" (
    "user_id" INTEGER NOT NULL,
    "project_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,
    "permissions" TEXT NOT NULL,

    CONSTRAINT "User_Project_pkey" PRIMARY KEY ("user_id","project_id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task_Dependency" (
    "task_id" INTEGER NOT NULL,
    "dependent_task_id" INTEGER NOT NULL,

    CONSTRAINT "Task_Dependency_pkey" PRIMARY KEY ("task_id","dependent_task_id")
);

-- CreateTable
CREATE TABLE "TimeLog" (
    "id" SERIAL NOT NULL,
    "taskId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TimeLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reminder" (
    "id" SERIAL NOT NULL,
    "taskId" INTEGER NOT NULL,
    "remindAt" TIMESTAMP(3) NOT NULL,
    "method" TEXT NOT NULL,

    CONSTRAINT "Reminder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task_Comment" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "task_id" INTEGER NOT NULL,

    CONSTRAINT "Task_Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task_Attachment" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "task_id" INTEGER NOT NULL,

    CONSTRAINT "Task_Attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Task" (
    "user_id" INTEGER NOT NULL,
    "task_id" INTEGER NOT NULL,
    "responsibility" TEXT NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_Task_pkey" PRIMARY KEY ("user_id","task_id")
);

-- CreateTable
CREATE TABLE "Task_History" (
    "id" SERIAL NOT NULL,
    "task_id" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Task_History_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AI_Prediction" (
    "id" SERIAL NOT NULL,
    "predicted_task" JSONB NOT NULL,
    "task_id" INTEGER NOT NULL,
    "recommendation" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AI_Prediction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task_State" (
    "id" SERIAL NOT NULL,
    "task_id" INTEGER NOT NULL,
    "state_from" TEXT NOT NULL,
    "state_to" TEXT NOT NULL,
    "change_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_State_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Reccuring_task_taskId_key" ON "Reccuring_task"("taskId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reccuring_task" ADD CONSTRAINT "Reccuring_task_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task_Tag" ADD CONSTRAINT "Task_Tag_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task_Tag" ADD CONSTRAINT "Task_Tag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Project" ADD CONSTRAINT "User_Project_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Project" ADD CONSTRAINT "User_Project_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Project" ADD CONSTRAINT "User_Project_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task_Dependency" ADD CONSTRAINT "Task_Dependency_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task_Dependency" ADD CONSTRAINT "Task_Dependency_dependent_task_id_fkey" FOREIGN KEY ("dependent_task_id") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeLog" ADD CONSTRAINT "TimeLog_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeLog" ADD CONSTRAINT "TimeLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reminder" ADD CONSTRAINT "Reminder_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task_Comment" ADD CONSTRAINT "Task_Comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task_Comment" ADD CONSTRAINT "Task_Comment_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task_Attachment" ADD CONSTRAINT "Task_Attachment_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Task" ADD CONSTRAINT "User_Task_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Task" ADD CONSTRAINT "User_Task_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task_History" ADD CONSTRAINT "Task_History_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AI_Prediction" ADD CONSTRAINT "AI_Prediction_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task_State" ADD CONSTRAINT "Task_State_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
