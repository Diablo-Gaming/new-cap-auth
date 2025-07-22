import axiosInstance from '../../lib/axios.instance';

export const signUp = async (userData) => {
  try {
    const response = await axiosInstance.post(`/auth/signup`, userData, {
      headers: { 'Content-Type': 'application/json' },
    });
    alert(response.data.message); // Success message
    return response.data;
  } catch (error) {
    alert(error.response?.data?.message || 'Signup Failed!'); // Show API error message
  }
};

export const logIn = async (loginData) => {
  try {
    const response = await axiosInstance.post(`/auth/login`, loginData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    alert(error.response?.data?.message || 'Login Failed!'); // Show API error message
  }
};
