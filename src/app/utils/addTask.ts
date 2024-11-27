import dayjs from "dayjs";
import { TaskProps } from "../Components/showTask";
export default async function addTask(task: TaskProps) {
    
try {
  const tasksWithDueDateUTC = {
    ...task,
    dueDate: task.dueDate ? dayjs(task.dueDate).utc().toDate():null,
  };
      const res = await fetch(`/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tasksWithDueDateUTC),
        // body: JSON.stringify(task),
      });
      if (!res.ok) {
        throw new Error("Failed to update task");
      }
      console.log("saved value "+tasksWithDueDateUTC);
    } catch (error) {
      console.error("Error updating task:", error);
    }
    // console.log(task);
  };