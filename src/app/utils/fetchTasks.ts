import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
export async function fetchTasks(projectId?: number|undefined) {
    try{
        const url =projectId? `/api/tasks?projectId=${projectId}` : `/api/tasks` ;
        const res = await fetch(url,{
            method: "GET"
        });
        if(!res.ok) {
            const errorDetails = await res.json();
            console.error("Error fetching tasks:", errorDetails);
            throw new Error(errorDetails.error||"Failed to fetch tasks");
        }


        return await res.json();
    }catch(error){
        console.error("Error fetching tasks:", error);
        throw error;
    }
    }