import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import emailService from './emailService';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  data: [],
  message: '',
};

export const postEmail = createAsyncThunk(
  'email/sendEmail',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await emailService.sendEmail(data, token);
    } catch (error) {
      const message =
        (error.reponse && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const postBulkEmail = createAsyncThunk(
  'post/BulkEmail',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await emailService.bulkEmail(data, token);
    } catch (error) {
      const message =
        (error.reponse && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getBulkEmail = createAsyncThunk(
  'get/BulkEmail',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await emailService.getEmail(token);
    } catch (error) {
      const message =
        (error.reponse && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const sendEmail = createSlice({
  name: 'email',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(postEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(postEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(postBulkEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postBulkEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data.push(action.payload);
      })
      .addCase(postBulkEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getBulkEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBulkEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(getBulkEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
export const { reset } = sendEmail.actions;
export default sendEmail.reducer;
