import axios from 'axios';

interface RegisterData {
  username: string;
  password: string;
  email: string;
}

export const registerUser = async (data: RegisterData) => {
  try {
    const response = await axios.post('http://localhost:5000/register', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};