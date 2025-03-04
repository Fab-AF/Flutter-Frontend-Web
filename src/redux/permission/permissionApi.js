import axios from 'axios';
import Cookies from "js-cookie";
import process from "process";

// const baseurl = process.env.BACKEND_API_URL; 
const baseurl = "http://localhost:5000/api";

export const getPermissions = async () => {
  try {
    const token = Cookies.get("token");
    const response = await axios.get(`${baseurl}/permissions`, {
     
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Failed to fetch permissions');
  }
};

export const createPermission = async (permissionData) => {
  try {
    const token = Cookies.get("token");
    const response = await axios.post(`${baseurl}/permissions`, permissionData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Permission creation failed');
  }
};

export const updatePermission = async (id, permissionData) => {
  try {
    const token = Cookies.get("token");
    const response = await axios.put(`${baseurl}/permissions/${id}`, permissionData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Permission update failed');
  }
};

export const deletePermission = async (id) => {
  try {
    const token = Cookies.get("token");
    const response = await axios.delete(`${baseurl}/permissions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Permission deletion failed');
  }
};

export const getPermissionById = async (id) => {
  try {
    const token = Cookies.get("token");
    const response = await axios.get(`${baseurl}/permissions/${id}`, {
      
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Failed to fetch permission');
  }
};
