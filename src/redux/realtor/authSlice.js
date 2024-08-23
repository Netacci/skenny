import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { publicRequest, userRequest } from '../../utils/requestMethod';

const initialState = {
  loading: false,
  error: null,
  user: JSON.parse(localStorage.getItem('realtorInfo')) || {},
};

export const registerRealtor = createAsyncThunk(
  'auth/register',
  async (data, thunkAPI) => {
    try {
      const response = await publicRequest.post('auth/register', data);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const confirmEmail = createAsyncThunk(
  'auth/confirmEmail',
  async (token, thunkAPI) => {
    try {
      const response = await publicRequest.put('auth/verify-email', { token });

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
  try {
    const response = await publicRequest.post('auth/login', data);

    localStorage.setItem('realtorInfo', JSON.stringify(response.data.data));
    localStorage.setItem('accountType', response.data.data.account_type);
    localStorage.setItem('token', response.data.token);

    return response.data.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const forgotPassword = createAsyncThunk(
  'auth/forgot-password',
  async (data, thunkAPI) => {
    try {
      const response = await publicRequest.put('auth/forgot-password', data);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetPassword = createAsyncThunk(
  'auth/reset-password',
  async (data, thunkAPI) => {
    try {
      const response = await publicRequest.put('auth/reset-password', data);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const changePassword = createAsyncThunk(
  'auth/change-password',
  async (data, thunkAPI) => {
    try {
      const response = await userRequest.put('auth/change-password', data);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteProfile = createAsyncThunk(
  'auth/delete',
  async (_, thunkAPI) => {
    try {
      const response = await userRequest.delete('auth/delete-realtor-profile');
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const editProfile = createAsyncThunk(
  'auth/edit-profile',
  async (data, thunkAPI) => {
    try {
      const response = await userRequest.put('auth/edit-profile', data);
      console.log(response);
      localStorage.setItem('realtorInfo', JSON.stringify(response.data.data));
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    //  handling login action
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed'; // Store the error message on login failure
      })
      .addCase(editProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(editProfile.rejected, (state) => {
        state.loading = false;
        state.error = false;
      });
  },
});

export default authSlice.reducer;
