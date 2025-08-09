import React, { useState, useEffect } from "react";
import { getEventsByUserId, deleteEventById, createEvent } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/contexts/AuthContext";
import EventCalendar from "../components/EventCalendar";
import { toast } from "react-toastify"; // Install with: npm i react-toastify
import "react-toastify/dist/ReactToastify.css";

const EventsDashboardPage = () => {
    const [events, setEvents] = useState([]);
    const [date, setDate] = useState(new Date());
    const [showForm, setShowForm] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: "",
        date: "",
        description: "",
        location: "",
        photo: null,
    });

    const { currentUser } = useAuth();
    const navigate = useNavigate();

    // Fetch events from backend on page load
    useEffect(() => {
        if (currentUser?.uid) {
            loadEvents();
        }
    }, [currentUser]);

    const loadEvents = async () => {
        const data = await getEventsByUserId(currentUser.uid);
        setEvents(data || []);
    };

    // Handle Create Event (Optimistic UI + backend save)
    const handleCreateEvent = async () => {
        if (!currentUser) {
            toast.error("Please login to continue");
            return;
        }

        if (!newEvent.title || !newEvent.date || !newEvent.description || !newEvent.location) {
            toast.error("Please fill all required fields");
            return;
        }

        // Create temporary ID for frontend
        const tempId = Date.now().toString();

        // Optimistic update
        const optimisticEvent = {
            _id: tempId,
            title: newEvent.title,
            date: newEvent.date,
            description: newEvent.description,
            location: newEvent.location,
            photo: newEvent.photo ? URL.createObjectURL(newEvent.photo) : null,
            userId: currentUser.uid,
        };
        setEvents((prev) => [...prev, optimisticEvent]);

        // Send to backend
        const formData = new FormData();
        formData.append("title", newEvent.title);
        formData.append("date", newEvent.date);
        formData.append("description", newEvent.description);
        formData.append("location", newEvent.location);
        formData.append("userId", currentUser.uid);
        if (newEvent.photo) formData.append("photo", newEvent.photo);

        try {
            const savedEvent = await createEvent(formData);

            // Replace optimistic event with saved one
            setEvents((prev) =>
                prev.map((event) => (event._id === tempId ? savedEvent : event))
            );

            toast.success("Event created successfully");
        } catch (error) {
            // Rollback optimistic event on error
            setEvents((prev) => prev.filter((event) => event._id !== tempId));
            toast.error("Failed to save event");
        }

        // Reset form
        setShowForm(false);
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

    const handleUpdate = (id) => {
        if (!currentUser) {
            toast.error("Please login to continue");
            return;
        }
        navigate(`/event/${id}`);
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
                            onClick={() => setShowForm(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                        >
                            + Add New Event
                        </button>
                    </div>
                    <table className="w-full bg-white rounded-lg overflow-hidden">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="p-3 text-left">Event Name</th>
                                <th className="p-3">Date</th>
                                <th className="p-3">Location</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="p-4 text-center text-gray-500">
                                        No events found
                                    </td>
                                </tr>
                            ) : (
                                events.map((event) => (
                                    <tr key={event._id} className="border-t">
                                        <td className="p-3">{event.title}</td>
                                        <td className="p-3">{new Date(event.date).toLocaleDateString()}</td>
                                        <td className="p-3">{event.location}</td>
                                        <td className="p-3 flex gap-2">
                                            <button
                                                onClick={() => handleUpdate(event._id)}
                                                className="bg-yellow-500 text-white px-3 py-1 rounded"
                                            >
                                                Update
                                            </button>
                                            <button
                                                onClick={() => handleDelete(event._id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Event Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h3 className="text-xl font-bold mb-4">Add New Event</h3>
                        <input
                            type="text"
                            placeholder="Event Name"
                            value={newEvent.title}
                            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                            className="border p-2 mb-3 w-full"
                        />
                        <input
                            type="date"
                            value={newEvent.date}
                            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                            className="border p-2 mb-3 w-full"
                        />
                        <textarea
                            placeholder="Description"
                            value={newEvent.description}
                            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                            className="border p-2 mb-3 w-full"
                        />
                        <input
                            type="text"
                            placeholder="Location"
                            value={newEvent.location}
                            onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                            className="border p-2 mb-3 w-full"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setNewEvent({ ...newEvent, photo: e.target.files[0] })}
                            className="border p-2 mb-3 w-full"
                        />
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setShowForm(false)} className="px-4 py-2 border rounded">
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateEvent}
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventsDashboardPage;
