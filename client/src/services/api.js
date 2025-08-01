import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;


const config = {
    method:"GET",
    Headers:{
        Accept:'*/*'
    }
}

export const getEvents = async () => {
    try{
        const res = await axios(`${BASE_URL}/events`);

        const data = res.data;
        return data;
        // console.log(data);

    }catch(err){
        console.error("failed to fetch data from db: ",err);
    }
}
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


