import {post, get, patch} from "../utils/api";

const API_URL = process.env.REACT_APP_API_URL ?? "http://localhost:5000/api";

const GetTimelineRequests = async () => get(`${API_URL}/timeline/get`);

async function UpdateTimelineRequest(body) {
    console.log("Update check out styatus ",body)
    const token = localStorage.getItem("merakihr-token");
    const result = await fetch(`${API_URL}/timeline/update/${body.id}`,{
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

async function CreateTimelineRequest (params) { 

    console.log("Time Line Request Create ",params)
    const token = localStorage.getItem("merakihr-token");
    const result = await fetch(`${API_URL}/timeline/create`, {
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

async function GetTimelineRequestByDate(date,id) {

    console.log("Time Line Request Create ",date)

    const token = localStorage.getItem("merakihr-token");
    const result = await fetch(`${API_URL}/timeline/get/${date}/${id}`, {
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


export const TimelineService = {
    GetTimelineRequests,
    UpdateTimelineRequest,
    CreateTimelineRequest,
    GetTimelineRequestByDate

};
 