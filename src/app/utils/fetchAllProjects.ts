export async function fetchAllProjects() {
    try{
        
        const url = `/api/projects`;
        const res = await fetch(url, {
            method: "GET"
        });
        if(!res.ok) {
            const errorDetails = await res.json();
            console.error("Error fetching projects:", errorDetails);
            throw new Error(errorDetails.error||"Failed to fetch projects");
        }
        return await res.json();
    }catch(error){
        console.log("Error fetching projects",error)
        throw error;
    }
}