import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; 

// Get vehicle types by number of wheels (2 or 4)
export const getVehicleTypes = async (wheels) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/types?wheels=${wheels}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching vehicle types:', error);
    throw error;
  }
};

// Get specific vehicles by type ID
export const getVehicles = async (typeId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/vehicles?typeId=${typeId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    throw error;
  }
};

// Submit booking data
export const bookVehicle = async (bookingData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/book`, bookingData);
    return response.data;
  } catch (error) {
    console.error('Error submitting booking:', error.response?.data || error.message);
    throw error;
  }
};
