import { getEventById } from '@/services/api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function EventDetailsPage() {
  const { id } = useParams();
  const [eventDetails,setEventDetails] = useState([]);

  useEffect(()=>{
    const handleUpdate = async () => {
      try{
        const savedEvent = await getEventById(id);
        setEventDetails(savedEvent);
        console.log(eventDetails);
      }catch(err){
        console.error(err.message);
        toast.error('failed to fetch event details')
        
      }
    }

    handleUpdate();
  },[]);
  

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Event Details</h1>
      {/* <p>Event ID: {id}</p> */}
      {/* Here you can fetch event details by ID and show an edit form */}
      {eventDetails && eventDetails?.map((event) => (
        <div key={event._id} className='text-lg text-zinc-500 gap-2 p-3 flex justify-center'>
          <span>
              
              {event.title}
              
          </span>

          <span>
            {event.description}
          </span>

          <span>
            {event.date.split('T')[0]}
          </span>
        </div>
      ))}
    </div>
  );
}
