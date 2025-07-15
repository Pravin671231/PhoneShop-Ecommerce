import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API = import.meta.env.VITE_API_URL;

//register
export const registerUser = createAsyncThunk(
  "user/register",
  async (data, thankAPI) => {
    try {
      const res = await axios.post(`${API}/users/register`, data);
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      return res.data;
    } catch (error) {
      return thankAPI.rejectWithValue(error.response.data.message);
    }
  }
);
//login
export const loginUser = createAsyncThunk(
  "user/login",
  async (data, thankAPI) => {
    try {
      const res = await axios.post(`${API}/users/login`, data);
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      return res.data;
    } catch (error) {
      return thankAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userInfo");
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
