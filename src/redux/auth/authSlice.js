import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signIn } from './authApi';
import Cookies from 'js-cookie'; // Import js-cookie to manage cookies

export const signInUser = createAsyncThunk('auth/signInUser', async ({ email, password }) => {
  const response = await signIn(email, password);
  if (response.token) { // Check if the response contains a token
    Cookies.set('token', response.token); // Set the token in a cookie
  }
  return response;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      Cookies.remove('token'); // Remove the token from the cookie on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
