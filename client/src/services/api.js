import axios from "axios";

const BASE_URL = 'http://localhost:5000/api';


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

