export async function fetchAllProjects() {
    try{
        
        const url = `/api/projects`;
        const res = await fetch(url, {
            method: "GET",
            headers: {
        'Content-Type': 'application/json',
      },
        });
        if(!res.ok) {
            const errorDetails = await res.json();
            console.error("Error fetching projects :", errorDetails);
            throw new Error(errorDetails.error||"Failed to fetch projects");
        }
const projects = await res.json();

    if (projects.length === 0) {
      console.log('No projects found for the user');
    }

    return projects;    }catch(error){
        console.log("Error fetching projects",error)
        throw error;
    }
}