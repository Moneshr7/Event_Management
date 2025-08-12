import React, { useState, useEffect } from "react";
import { getEventsByUserId, deleteEventById, createEvent, updateEventById } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/contexts/AuthContext";
import EventCalendar from "../components/EventCalendar";
import EventTable from "../components/EventTable";
import AddEventModal from "../components/AddEventModal";
import EditEventModal from "../components/EditEventModal"; // <-- Import the new modal
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";

    
const EventsDashboardPage = () => {
 const [events, setEvents] = useState([]);
 const [date, setDate] = useState(new Date());
 const [showAddForm, setShowAddForm] = useState(false); // Renamed for clarity
 const [editingEvent, setEditingEvent] = useState(null); // New state to hold the event being edited

 const { currentUser, newEvent, setNewEvent } = useAuth();
 const navigate = useNavigate();

 useEffect(() => {
  if (currentUser?.uid) {
   loadEvents();
  }
 }, [currentUser]);

 const loadEvents = async () => {
  const data = await getEventsByUserId(currentUser.uid);
  setEvents(data || []);
 };

 const handleCreateEvent = async () => {
  if (!currentUser) {
   toast.error("Please login to continue");
   return;
  }
  if (!newEvent.title || !newEvent.date || !newEvent.description || !newEvent.location) {
   toast.error("Please fill all required fields");
   return;
  }

  try {
   const eventToCreate = { ...newEvent, userId: currentUser.uid };
   const savedEvent = await createEvent(eventToCreate);

   setEvents((prev) => [...prev, savedEvent]);
   toast.success("Event created successfully");
  } catch (error) {
   console.error(error);
   toast.error("Failed to save event");
  }

  setShowAddForm(false);
  setNewEvent({ title: "", date: "", description: "", location: "", photo: null });
 };

 const handleDelete = async (id) => {
  if (!currentUser) {
   toast.error("Please login to continue");
   return;
  }

  await deleteEventById(id);
  setEvents((prev) => prev.filter((event) => event._id !== id));
  toast.success("Event deleted");
 };

 const handleClick = (id) => {
  if (!currentUser) {
   toast.error("Please login to continue");
   return;
  }
  navigate(`/events/${id}`);
 };

 // This function now prepares to edit an event by setting it in state
 const handleEditClick = (id) => {
  if (!currentUser) {
   toast.error("Please login to continue");
   return;
  }
  const eventToEdit = events.find(event => event._id === id);
  setEditingEvent(eventToEdit);
 };

 // This is the actual function that sends the update request
 const handleUpdate = async (updatedEventData) => {
    if (!currentUser || !editingEvent) {
      toast.error("Invalid action");
      return;
    }
    
  try {
   const updatedEvent = await updateEventById(editingEvent._id, updatedEventData);
   setEvents((prev) =>
    prev.map((event) => (event._id === editingEvent._id ? updatedEvent : event))
   );
   setEditingEvent(null); // Close the edit modal
   toast.success("Event updated successfully");
  } catch (error) {
   console.error(error);
   toast.error("Failed to update event");
  }
 };

 return (
  <div className="min-h-screen bg-gradient-to-br from-gray-950 to-fuchsia-700 flex flex-col p-10">
   <h1 className="text-4xl font-bold text-white mb-6">☄️ Event Dashboard</h1>
   <div className="flex gap-10">
    
    {/* Calendar */}
    <div className="bg-gray-900 p-4 rounded-lg shadow-md">
     <EventCalendar events={events} selectedDate={date} onDateSelect={setDate} />
    </div>

    {/* Events Table */}
    <div className="flex-1">
     <div className="flex justify-between mb-4">
      <h2 className="text-2xl text-white">Your Events</h2>
      <button
       onClick={() => setShowAddForm(true)}
       className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
       + Add New Event
      </button>
     </div>
     <EventTable
      events={events}
      onUpdate={handleEditClick} // Changed to handle the click and open modal
      onDelete={handleDelete}
      onClicked={handleClick}
     />
    </div>
   </div>

   {/* Add Event Modal */}
   {showAddForm && (
    <AddEventModal
     onSave={handleCreateEvent}
     onCancel={() => setShowAddForm(false)}
    />
   )}

   {/* Edit Event Modal */}
   {editingEvent && (
    <EditEventModal
     event={editingEvent} // Pass the event data to the modal
     onSave={handleUpdate} // Call the update handler
     onCancel={() => setEditingEvent(null)} // Close the modal
    />
   )}
  </div>
 );
};

export default EventsDashboardPage;