import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getPermissions, 
  createPermission, 
  updatePermission, 
  deletePermission,
  getPermissionById
} from './permissionApi';

const initialState = {
  permissions: [],
  selectedPermission: null,
  status: 'idle',
  error: null
};

export const fetchPermissions = createAsyncThunk(
  'permissions/fetchPermissions',
  async () => {
    const response = await getPermissions();
    return response;
  }
);

export const addPermission = createAsyncThunk(
  'permissions/addPermission',
  async (permissionData) => {
    const response = await createPermission(permissionData);
    return response;
  }
);

export const updatePermissions = createAsyncThunk(
  'permissions/updatePermissions',
  async ({id, permissionData}) => {
    const response = await updatePermission(id, permissionData);
    return response;
  }
);

export const removePermission = createAsyncThunk(
  'permissions/removePermission',
  async (id) => {
    const response = await deletePermission(id);
    return response;
  }
);

export const fetchPermissionById = createAsyncThunk(
  'permissions/fetchPermissionById',
  async (id) => {
    const response = await getPermissionById(id);
    return response;
  }
);

const permissionSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    clearSelectedPermission: (state) => {
      state.selectedPermission = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPermissions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPermissions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.permissions = action.payload;
      })
      .addCase(fetchPermissions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addPermission.fulfilled, (state, action) => {
        state.permissions.push(action.payload);
      })
      .addCase(updatePermissions.fulfilled, (state, action) => {
        const index = state.permissions.findIndex(
          permission => permission._id === action.payload._id
        );
        if (index !== -1) {
          state.permissions[index] = action.payload;
        }
      })
      .addCase(removePermission.fulfilled, (state, action) => {
        state.permissions = state.permissions.filter(
          permission => permission._id !== action.payload._id
        );
      })
      .addCase(fetchPermissionById.fulfilled, (state, action) => {
        state.selectedPermission = action.payload;
      });
  }
});

export const { clearSelectedPermission } = permissionSlice.actions;

export default permissionSlice.reducer;
