import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUserResponse } from 'src/api';

import { AuthResponse, checkAuth, getUsers, logout, singIn, singUp } from './action';
import { UserState } from './types';

const initialState: UserState = {
  email: null,
  isActivated: null,
  users: [],
  isFetching: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [singUp.pending.type]: (state) => {
      state.isFetching = true;
    },
    [singUp.fulfilled.type]: (state) => {
      state.isFetching = false;
    },
    [singUp.rejected.type]: (state) => {
      state.isFetching = false;
    },
    [singIn.pending.type]: (state) => {
      state.isFetching = true;
    },
    [singIn.fulfilled.type]: (state, action: PayloadAction<IUserResponse>) => {
      state.email = action.payload.user.email;
      state.isActivated = action.payload.user.isActivated;
      state.isFetching = false;
    },
    [singIn.rejected.type]: (state) => {
      state.isFetching = false;
    },
    [checkAuth.pending.type]: (state) => {
      state.isFetching = true;
    },
    [checkAuth.fulfilled.type]: (state, action: PayloadAction<AuthResponse>) => {
      state.email = action.payload.user.email;
      state.isActivated = action.payload.user.isActivated;
      state.isFetching = false;
    },
    [checkAuth.rejected.type]: (state) => {
      state.isFetching = false;
    },
    [logout.fulfilled.type]: (state) => {
      state = { ...initialState };
    },
    [getUsers.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.users = action.payload;
    },
  },
});

export default userSlice.reducer;
