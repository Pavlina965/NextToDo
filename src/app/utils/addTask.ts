// import dayjs from "dayjs";
import { TaskProps } from "../components/showTask";
export default async function addTask(task: TaskProps) {
    
try {

      const res = await fetch(`/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (!res.ok) {
        throw new Error("Failed to add task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };