import React, { useState, useEffect } from 'react';
import { useAuth } from '../lib/contexts/AuthContext';
import { toast } from 'react-toastify';

const EditEventModal = ({ event, onSave, onCancel }) => {
  const { setNewEvent } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    description: '',
    location: '',
    photo: null,
  });

  // Effect to populate form data when the event prop changes
  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        date: event.date ? new Date(event.date).toISOString().substring(0, 10) : '',
        description: event.description,
        location: event.location,
        photo: event.photo, // Retain existing photo URL for display
      });
    }
  }, [event]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      photo: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.description || !formData.location) {
      toast.error('Please fill all required fields');
      return;
    }
    // Pass the updated data back to the parent component's onSave handler
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Edit Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-700">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block text-gray-700">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="photo" className="block text-gray-700">Photo</label>
            {formData.photo && typeof formData.photo === 'string' && (
              <p className="text-sm text-gray-500 mb-2">Current photo: <a href={formData.photo} target="_blank" rel="noopener noreferrer">View</a></p>
            )}
            <input
              type="file"
              id="photo"
              name="photo"
              onChange={handleFileChange}
              className="w-full mt-1"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Update Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventModal;