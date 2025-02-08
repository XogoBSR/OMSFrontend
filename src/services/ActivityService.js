

const API_URL = process.env.REACT_APP_API_URL ?? "http://localhost:5000/api";

async function createTodayGoal (params) { 

    const token = localStorage.getItem("merakihr-token");
    const result = await fetch(`${API_URL}/today/goal`, {
        method: 'POST',
         body: JSON.stringify(params),
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    if(result) {
         return result 
    }
}

async function getUserActivityHistory (id) {
    
    const token = localStorage.getItem("merakihr-token");
    console.log("Get User Activity History ",id)
    const result = await fetch(`${API_URL}/today/history/${id}`,{
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

async function updateCheckOutStatus(body) {
    console.log("Update check out styatus ",body)
    const token = localStorage.getItem("merakihr-token");
    const result = await fetch(`${API_URL}/today/checkout`,{
        method: 'PATCH',
        body: JSON.stringify(body),
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
           
        }
    })
    if(result) {
         return result 
    }

}

async function updateBreakInStatus(body) {
    const token = localStorage.getItem("merakihr-token");
    const result = await fetch(`${API_URL}/today/breakIn`,{
        method: 'PATCH',
        body: JSON.stringify(body),
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    })
    if(result) {
         return result 
    } 
}

async function updateBreakOutStatus(body) {
    const token = localStorage.getItem("merakihr-token");
    const result = await fetch(`${API_URL}/today/breakOut`,{
        method: 'PATCH',
        body: JSON.stringify(body),
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    })
    if(result) {
         return result 
    } 
}

async function updateTodayStatus(body) {
    const token = localStorage.getItem("merakihr-token");
    const result = await fetch(`${API_URL}/today/status`,{
        method: 'PATCH',
        body: JSON.stringify(body),
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    })
    if(result) {
         return result 
    } 
}

async function updateLateCheckInStatus(body) {
    const token = localStorage.getItem("merakihr-token");
    const result = await fetch(`${API_URL}/today/late/checkin`,{
        method: 'PATCH',
        body: JSON.stringify(body),
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    })
    if(result) {
         return result 
    } 
}

async function updateEarlyCheckOutStatus(body) {
    const token = localStorage.getItem("merakihr-token");
    const result = await fetch(`${API_URL}/today/early/checkout`,{
        method: 'PATCH',
        body: JSON.stringify(body),
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    })
    if(result) {
         return result 
    } 
}

async function updateIdelStartStatus(body) {
    const token = localStorage.getItem("merakihr-token");
    const result = await fetch(`${API_URL}/today/idelstart`,{
        method: 'PATCH',
        body: JSON.stringify(body),
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    })
    if(result) {
         return result 
    } 
}

async function updateIdelEndStatus(body) {
    const token = localStorage.getItem("merakihr-token");
    const result = await fetch(`${API_URL}/today/idelend`,{
        method: 'PATCH',
        body: JSON.stringify(body),
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    })
    if(result) {
         return result 
    } 
}

async function updateProductivityStatus(body) {
    const token = localStorage.getItem("merakihr-token");
    const result = await fetch(`${API_URL}/today/product`,{
        method: 'PATCH',
        body: JSON.stringify(body),
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    })
    if(result) {
         return result 
    } 
}

async function updateOverLimitBreakStatus(body) {
    const token = localStorage.getItem("merakihr-token")
    const result = await fetch(`${API_URL}/today/break/over`,{
        method:"PATCH",
        body: JSON.stringify(body),
        headers:{
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    })
    if(result) {
        return result
    }
}

export const ActivityService = {
    createTodayGoal,
    getUserActivityHistory,
    updateCheckOutStatus,
    updateBreakInStatus,
    updateBreakOutStatus,
    updateTodayStatus,
    updateLateCheckInStatus,
    updateEarlyCheckOutStatus,
    updateIdelStartStatus,
    updateIdelEndStatus,
    updateProductivityStatus,
    updateOverLimitBreakStatus
    
};