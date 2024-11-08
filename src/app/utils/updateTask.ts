import { TaskProps } from "../Components/showTask";
export default async function updateTask(updatedTask: TaskProps) {
    
try {
      const res = await fetch(`/api/tasks?id=${updatedTask.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });
      if (!res.ok) {
        throw new Error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
    console.log(updatedTask);
  };