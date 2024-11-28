// import dayjs from "dayjs";
import { TaskProps } from "../Components/showTask";
export default async function addTask(task: TaskProps) {
    
try {

      const res = await fetch(`/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      console.log("Task being sent:", JSON.stringify(task));
      // console.log(JSON.stringify(task.dueDate));
      // console.log(task.dueDate);
      if (!res.ok) {
        throw new Error("Failed to add task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };