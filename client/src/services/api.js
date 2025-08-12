// src/services/api.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL; // e.g. "http://localhost:5000/api"

export const createEvent = async (eventData) => {
  try {
    console.log(eventData);
    const res = await axios.post(`${BASE_URL}/events`, eventData);
    return res.data;
  } catch (err) {
    console.error("failed to create event: ", err);
    throw err; // rethrow so caller knows it failed
  }
};

export const getEventsByUserId = async (userId) => {
  try {
    const res = await axios.get(`${BASE_URL}/events/user/${userId}`);
    return res.data;
  } catch (err) {
    console.error("failed to fetch user events: ", err);
    throw err;
  }
};

export const getEventById = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/events/${id}`);
    return res.data;
  } catch (err) {
    console.error("failed to fetch data from db: ", err);
    throw err;
  }
};

export const deleteEventById = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/events/${id}`);
    return res.data; // ✅ add return so caller can confirm success
  } catch (err) {
    console.error("failed to delete event: ", err);
    throw err;
  }
};


export const updateEventById = async (id, data) => {
  try {
    const res = await axios.put(`${BASE_URL}/events/${id}`, data);
    return res.data;
  } catch (err) {
    console.error("failed to Update: ", err);
    throw err;
  }
};
