import React, { useEffect } from 'react'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { getEvents } from './services/api';

const App = () => {
  const [eventData,setEventData] = useState(null);
  const [loading,setLoading] = useState(false);

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

  useEffect(()=>{
    fetchData();
  },[])

  return (
    <>
      <div className='w-screen h-screen flex justify-center items-center bg-linear-to-r from-fuchsia-200 to-fuchsia-500'>
        {/* <button onClick={()=>fetchData()} className='rounded-xl px-4 py-2 bg-amber-200'>
          {loading ? "Loading ..." : "Fetch !"}
        </button> */}
        <div className='flex justify-center items-center gap-2'>
          {eventData?.map((events)=>(
            <div key={events._id} className='flex flex-col justify-center items-center p-10 bg-zinc-400 rounded-xl '>
              <p className='text-black'>{events.title}</p>
              <p className='text-black'>{events.date}</p>
              <p className='text-black'>{events.description}</p>
              <p className='text-black'>{events.location}</p>
            </div>
          ))}
          
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default App
