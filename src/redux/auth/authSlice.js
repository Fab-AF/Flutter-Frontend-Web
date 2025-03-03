import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signIn, getAllUsers } from './authApi';
import Cookies from 'js-cookie'; // Import js-cookie to manage cookies

export const signInUser = createAsyncThunk('auth/signInUser', async ({ email, password }) => {
  const response = await signIn(email, password);
  if (response.token) { // Check if the response contains a token
    Cookies.set('token', response.token); // Set the token in a cookie
  }
  return response;
});

export const fetchAllUsers = createAsyncThunk('auth/fetchAllUsers', async () => {
  const response = await getAllUsers();
  return response;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    users: [],
    loading: false,
    error: null,
    usersLoading: false,
    usersError: null,
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
      })
      .addCase(fetchAllUsers.pending, (state) => {
        state.usersLoading = true;
        state.usersError = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.usersLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.usersLoading = false;
        state.usersError = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
