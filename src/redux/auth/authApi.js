import axios from 'axios';
import Cookies from "js-cookie"; // Import js-cookie to manage cookies
import process from "process";

// const baseurl = process.env.BACKEND_API_URL; 
const baseurl = "http://localhost:5000/api";


export const signIn = async (email, password) => {
  try {
    const response = await axios.post(`${baseurl}/users/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Sign in failed');
  }
};



export const signUp = async (email, password) => {
  try {
    const response = await axios.post(`${baseurl}/users/register`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : 'Sign up failed');
  }
};

export const register = async (data) => {
  try {
    const token = Cookies.get("token");
    const response = await axios.post(`${baseurl}/users/register`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : 'Sign up failed');
  }
};


export const logout = async () => {
  try {
    const token = Cookies.get("token");
    await axios.post(
      `${baseurl}/users/logout`,
      {}, // Empty body
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true // Ensure cookies are included in requests
      }
    );

    Cookies.remove("token"); // Ensure token is removed from frontend as well
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Logout failed"
    );
  }
};

export const getAllUsers = async () => {
  try {
    const token = Cookies.get("token");
    const response = await axios.get(`${baseurl}/users`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Failed to fetch users');
  }
};