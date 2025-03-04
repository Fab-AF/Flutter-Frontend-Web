import axios from 'axios';
import Cookies from "js-cookie";
import process from "process";

// const baseurl = process.env.BACKEND_API_URL; 
const baseurl = "http://localhost:5000/api";

export const createProduct = async (productData) => {
  try {
    const token = Cookies.get("token");
    const response = await axios.post(`${baseurl}/products`, productData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Product creation failed');
  }
};

export const getProducts = async () => {
  try {
    const response = await axios.get(`${baseurl}/products`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Failed to fetch products');
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${baseurl}/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Failed to fetch product');
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const token = Cookies.get("token");
    const response = await axios.put(`${baseurl}/products/${id}`, productData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Product update failed');
  }
};

export const deleteProduct = async (id) => {
  try {
    const token = Cookies.get("token");
    const response = await axios.delete(`${baseurl}/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Product deletion failed');
  }
};
