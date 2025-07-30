import React, { useEffect } from 'react'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { getEvents,getEventById, deleteEventById } from './services/api';



const App = () => {
  const [eventData,setEventData] = useState(null);
  const [loading,setLoading] = useState(false);
  const [singleEvent, setSingleEvent] = useState(null);


  const fetchData = async () => {
    try{
      setLoading(true);
      const res = await getEvents();
      console.log(res);
      setEventData(res);
    }catch(err){
      console.log(err);
    }finally{
      setLoading(false);
    }
  }

 

  const fetchOneEvent = async (id) => {
  try {
    const res = await getEventById(id);
    console.log(res);
    setSingleEvent(res);
  }
  
   catch (err) {
    console.log(err);
  }
};

  const handleDelete = async (id) => {
    try {
      await deleteEventById(id);
      console.log("deleted Successfully");
    }
    
    catch (err) {
      console.log(err);
    }
  };

useEffect(()=>{
    fetchData();
  },[eventData]);


  return (
    <>
      <div className='w-screen h-screen flex justify-center items-center bg-linear-to-r from-fuchsia-200 to-fuchsia-500'>
        <div className='flex justify-center items-center gap-2'>
          {eventData?.map((events)=>(
            <div key={events._id} className='flex flex-col justify-center items-center p-10 bg-zinc-400 rounded-xl '>
              <p className='text-black'>{events.title}</p>
              <p className='text-black'>{events.date}</p>
              <p className='text-black'>{events.Description}</p>
              <p className='text-black'>{events.location}</p>
              <button
        onClick={() => fetchOneEvent(events._id)}
        className='mt-2 px-4 py-2 bg-blue-500 text-white rounded'
             >View Details</button>
             <button
        onClick={() => handleDelete(events._id)}
        className='mt-2 px-4 py-2 bg-blue-500 text-white rounded'
             >Delete</button>
            </div>
          ))}
        </div>

         {singleEvent && (
      <div className='mt-10 p-5 bg-green-200 rounded'>
        <h2 className='text-xl font-bold'>Single Event Details</h2>
        <p>{singleEvent.title}</p>
        <p>{singleEvent.date}</p>
        <p>{singleEvent.Description}</p>
        <p>{singleEvent.location}</p>
      </div>
         )}
      </div>
      <ToastContainer />
    </>
  )
}

export default App
