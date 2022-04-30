import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  users: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  added: false,
  message: '',
};

// update password user
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await authService.register(user, token);
    } catch (error) {
      const message =
        (error.reponse && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Register user
export const addUser = createAsyncThunk(
  'auth/newuser',
  async (user, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await authService.addUser(user, token);
    } catch (error) {
      const message =
        (error.reponse && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//login
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.reponse && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

//get all users
//login
export const getAllusers = createAsyncThunk(
  'auth/users',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await authService.getAllUsers(token);
    } catch (error) {
      const message =
        (error.reponse && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  authService.logout();
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = '';
    },
    resetAdded: (state) => {
      state.added = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(addUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.added = true;
        state.users.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(getAllusers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllusers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(getAllusers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.users = [];
      });
  },
});

export const { reset, resetAdded } = authSlice.actions;
export default authSlice.reducer;
