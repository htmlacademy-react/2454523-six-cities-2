import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, AuthorizationStatus } from '../../const';
import { UserProcessState } from '../../types/state';
import { loginAction,logoutAction,checkAuthAction } from '../api-actions';
import { getEmail } from '../../services/email';


const initialState: UserProcessState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: null,
};

export const userProcessSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder){
    builder
      .addCase(checkAuthAction.fulfilled, (state)=> {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userEmail = (getEmail());
      })
      .addCase(checkAuthAction.rejected,(state)=> {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase (loginAction.fulfilled, (state,action)=> {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userEmail = action.payload.email;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase (logoutAction.fulfilled, (state) =>{
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });

  }
});
