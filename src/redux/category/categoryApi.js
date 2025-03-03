import axios from 'axios';
import Cookies from "js-cookie";
import process from "process";

// const baseurl = process.env.BACKEND_API_URL; 
const baseurl = "http://localhost:5000/api";

export const createCategory = async (categoryData) => {
  try {
    const response = await axios.post(`${baseurl}/categories`, categoryData, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Category creation failed');
  }
};

export const getCategories = async () => {
  try {
    const token = Cookies.get("token");

    const response = await axios.get(`${baseurl}/categories`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new 
    Error(error.response ? error.response.data.message : 'Failed to fetch categories');
  }
};

export const getCategoryById = async (id) => {
  try {
    const response = await axios.get(`${baseurl}/categories/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Failed to fetch category');
  }
};

export const updateCategory = async (id, categoryData) => {
  try {
    const response = await axios.put(`${baseurl}/categories/${id}`, categoryData);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Category update failed');
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(`${baseurl}/categories/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Category deletion failed');
  }
};
