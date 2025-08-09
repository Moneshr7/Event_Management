import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;


const config = {
    method:"GET",
    Headers:{
        Accept:'*/*'
    }
}
export const createEvent = async (eventData) => {
    try {
        const res = await axios.post(`${BASE_URL}/events`, eventData);
        return res.data;
    } catch (err) {
        console.error("failed to create event: ", err);
    }
};


export const getEventsByUserId = async (userId) => {
    try {
        const res = await axios.get(`${BASE_URL}/events/user/${userId}`);
        return res.data;
    } catch (err) {
        console.error("failed to fetch user events: ", err);
    }
};

export const getEventById = async (id) => {
    try{
  const res = await axios.get(`${BASE_URL}/events/${id}`);
  return res.data;
    }
    catch(err)
    {
        console.err("failed to fetch data from db: ",err);
    }
}

export const deleteEventById = async (id) => {
    try{
        const res = await axios.delete(`${BASE_URL}/events/${id}`);
    }
    catch(err)
    {
        console.err("failed to fetch data from db: ",err);
    }
}

export const updateEventById = async (id, data) => {
    try{
  const res = await axios.patch(`${BASE_URL}/events/${id}`, data);
  return res.data;
    }
    catch(err)
    {
        console.error("failed to Update: ",err);
    }
};


