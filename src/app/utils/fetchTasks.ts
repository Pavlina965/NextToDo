import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
export async function fetchTasks(dataId?: number|undefined) {
    try{
        const url = dataId? `/api/tasks?id=${dataId}` : `/api/tasks` ;
        const res = await fetch(url,{
            method: "GET"
        });
        if(!res.ok) {
            const errorDetails = await res.json();
            console.error("Error fetching tasks:", errorDetails);
            throw new Error(errorDetails.error||"Failed to fetch tasks");
        }
        // const tasksData = await res.json();
        // const tasksWithDueDateUTC = tasksData.map((task: TaskProps) => ({
        //     ...task,
        // dueDate: task.dueDate ? dayjs(task.dueDate).utc().format('YYYY-MM-DD HH:mm:ss') : null,        
        // }))
        // return tasksWithDueDateUTC;

        return await res.json();
    }catch(error){
        console.error("Error fetching tasks:", error);
        throw error;
    }
    }