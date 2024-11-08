
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
        return await res.json();
    }catch(error){
        console.error("Error fetching tasks:", error);
        throw error;
    }
    }