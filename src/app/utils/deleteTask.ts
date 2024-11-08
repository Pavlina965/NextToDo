
export async function deleteTask(taskId: number) {
try {
      const res = await fetch(`/api/tasks?id=${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: taskId }),
      });
      if (!res.ok) {
        throw new Error("Failed to delete task");
      }
    } catch (error) {
      console.error(error);
    }}