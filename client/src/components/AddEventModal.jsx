import { useAuth } from "@/lib/contexts/AuthContext";
import React from "react";



const AddEventModal = ({ onSave, onCancel }) => {
  const {newEvent,setNewEvent} = useAuth();

  return (
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
          <button onClick={onCancel} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEventModal;
