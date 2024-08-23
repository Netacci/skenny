import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  publicRequest,
  userFileRequest,
  userRequest,
} from '../../utils/requestMethod';

const initialState = {
  loading: false,
  error: null,
  property: null,
  properties: [],
  metadata: null,
  propertyBeingEdited: null,
  allProperties: [],
  singleProperty: null,
  allMetadata: null,
};
export const getRealtorProperties = createAsyncThunk(
  'get/realtorProperties',
  async ({ search, page, limit, state, country, propertyType }, thunkAPI) => {
    try {
      const response = await userRequest.get(
        `properties?q=${search}&page=${page}&limit=${limit}`
      );
      if (state) {
        const response = await userRequest.get(
          `properties?q=${search}&page=${page}&limit=${limit}&state=${state}`
        );
        return response.data;
      }
      if (country) {
        const response = await userRequest.get(
          `properties?q=${search}&page=${page}&limit=${limit}&country=${country}`
        );
        return response.data;
      }
      if (propertyType) {
        const response = await userRequest.get(
          `properties?q=${search}&page=${page}&limit=${limit}&property_type=${propertyType}`
        );
        return response.data;
      }
      if (state && country && propertyType) {
        const response = await userRequest.get(
          `properties?q=${search}&page=${page}&limit=${limit}&state=${state}&country=${country}&property_type=${propertyType}`
        );
        return response.data;
      }

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getSingleRealtorProperty = createAsyncThunk(
  'get/realtorSingleProperty',
  async (id, thunkAPI) => {
    try {
      const response = await userRequest.get(`properties/${id}`);
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const editRealtorProperty = createAsyncThunk(
  'update/realtorSingleProperty',
  async ({ data, id }, thunkAPI) => {
    try {
      const response = await userRequest.put(`properties/${id}`, data);
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteRealtorProperty = createAsyncThunk(
  'update/realtorSingleProperty',
  async (id, thunkAPI) => {
    try {
      const response = await userRequest.delete(`properties/${id}`);
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const uploadPropertyImage = createAsyncThunk(
  'update/propertyImage',
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const response = await userFileRequest.post('properties/upload', data);
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const uploadPropertyImages = createAsyncThunk(
  'update/propertyImage',
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const response = await userFileRequest.post('properties/uploads', data);
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addProperty = createAsyncThunk(
  'add/property',
  async (data, thunkAPI) => {
    try {
      const response = await userRequest.post('properties/add', data);
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAllProperties = createAsyncThunk(
  'get/allProperties',
  async ({ search, page, limit, state, country, propertyType }, thunkAPI) => {
    try {
      const response = await publicRequest.get(
        `users/properties?q=${search}&page=${page}&limit=${limit}`
      );
      console.log(response);
      if (state) {
        const response = await publicRequest.get(
          `users/properties?q=${search}&page=${page}&limit=${limit}&state=${state}`
        );
        return response.data;
      }
      if (country) {
        const response = await publicRequest.get(
          `users/properties?q=${search}&page=${page}&limit=${limit}&country=${country}`
        );
        return response.data;
      }
      if (propertyType) {
        const response = await publicRequest.get(
          `users/properties?q=${search}&page=${page}&limit=${limit}&property_type=${propertyType}`
        );
        return response.data;
      }
      if (state && country && propertyType) {
        const response = await publicRequest.get(
          `users/properties?q=${search}&page=${page}&limit=${limit}&state=${state}&country=${country}&property_type=${propertyType}`
        );
        return response.data;
      }

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getSingleProperty = createAsyncThunk(
  'get/singleProperty',
  async (id, thunkAPI) => {
    try {
      const response = await userRequest.get(`users/properties/${id}`);
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const propertiesSlice = createSlice({
  name: 'properties',
  initialState,

  reducers: {
    editProperty: (state, action) => {
      state.propertyBeingEdited = action.payload;
    },
  },

  extraReducers: (builder) => {
    //  handling login action
    builder

      .addCase(getRealtorProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRealtorProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload.properties;
        state.metadata = action.payload.metadata;
      })
      .addCase(getRealtorProperties.rejected, (state) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(getSingleRealtorProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleRealtorProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.property = action.payload.property;
      })
      .addCase(getSingleRealtorProperty.rejected, (state) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(getAllProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.allProperties = action.payload.properties;
        state.allMetadata = action.payload.metadata;
      })
      .addCase(getAllProperties.rejected, (state) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(getSingleProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProperty = action.payload.property;
      })
      .addCase(getSingleProperty.rejected, (state) => {
        state.loading = false;
        state.error = false;
      });
  },
});

export const { editProperty } = propertiesSlice.actions;
export default propertiesSlice.reducer;
