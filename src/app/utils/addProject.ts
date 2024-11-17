import { TaskProps } from "../Components/showTask";
export default async function addProject(task: TaskProps) {
    
try {
      const res = await fetch(`/api/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      if (!res.ok) {
        throw new Error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
    console.log(task);
  };