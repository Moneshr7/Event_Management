// src/components/EventTable.jsx
import React from "react";

const formatDateSafe = (dateVal) => {
  if (!dateVal) return "No date";
  const d = new Date(dateVal);
  if (isNaN(d.getTime())) return "Invalid date";
  return d.toLocaleDateString();
};

const EventTable = ({ events, onUpdate, onDelete,onClicked }) => {
  return (
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
            <tr key={event._id} className="border-t hover:bg-zinc-400 cursor-pointer" onClick={()=>onClicked(event._id)}>
              <td className="p-3">{event.title}</td>
              <td className="p-3">{formatDateSafe(event.date)}</td>
              <td className="p-3">{event.location}</td>
              <td className="p-3 flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpdate(event._id)
                  }}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Update
                </button>
                <button
                  onClick={(e) => {
                     e.stopPropagation(); // Stops the event from reaching the row's onClick
                     onDelete(event._id);
                   }}
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
  );
};

export default EventTable;
