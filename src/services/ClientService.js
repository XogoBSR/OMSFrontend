const API_URL = process.env.REACT_APP_API_URL ?? "http://localhost:5000/api";

async function createClient (body) { 

    console.log("Create Clientt ",body)
    const token = localStorage.getItem("merakihr-token");
    const result = await fetch(`${API_URL}/client/create`, {
        method: 'POST',
         body: JSON.stringify(body),
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    if(result) {
         return result 
    }
}

async function updateClient (id,body) { 

    const token = localStorage.getItem("merakihr-token");
    const result = await fetch(`${API_URL}/client/update/${id}`, {
        method: 'PATCH',
         body: JSON.stringify(body),
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    if(result) {
         return result 
    }
}

async function deleteClient (id,body) { 

    const token = localStorage.getItem("merakihr-token");
    const result = await fetch(`${API_URL}/client/delete/${id}`, {
        method: 'DELETE',
         body: JSON.stringify(body),
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    if(result) {
         return result 
    }
}

async function getClient() { 

    const token = localStorage.getItem("merakihr-token");
    console.log("Get CLEINT API")
    const result = await fetch(`${API_URL}/client`, {
        method: 'GET',
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    if(result) {
         return result 
    }
}


export const ClientService = {
    createClient,
    updateClient,
    getClient,
    deleteClient
}