import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { login, IUserRequest, fetchUsers, logoutUser, registration } from 'src/api';
import { API_URL } from 'src/shared/constants';
import { setAccessToken } from 'src/shared/lib';

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    id: string;
    isActivated: boolean;
  };
};

export const singUp = createAsyncThunk('/registration', async (payload: IUserRequest, thunkAPI) => {
  try {
    const response = await registration(payload.email, payload.password);

    setAccessToken(response.data.accessToken);

    return response.data;
  } catch {
    return thunkAPI.rejectWithValue('Authentication is failed');
  }
});

export const singIn = createAsyncThunk('/login', async (payload: IUserRequest, thunkAPI) => {
  try {
    const response = await login(payload.email, payload.password);

    setAccessToken(response.data.accessToken);

    return response.data;
  } catch {
    return thunkAPI.rejectWithValue('Authentication is failed');
  }
});

export const checkAuth = createAsyncThunk('/refresh', async (_, thunkAPI) => {
  try {
    const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true });

    setAccessToken(response.data.accessToken);

    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue('Authentication is failed');
  }
});

export const getUsers = createAsyncThunk('/users', async (_, thunkAPI) => {
  try {
    const response = await fetchUsers();

    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue('Authentication is failed');
  }
});

export const logout = createAsyncThunk('/logout', async (_, thunkAPI) => {
  try {
    const response = await logoutUser();

    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue('Authentication is failed');
  }
});
