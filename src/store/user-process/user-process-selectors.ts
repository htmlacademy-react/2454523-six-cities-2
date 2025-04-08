import { createSelector } from '@reduxjs/toolkit';
import { NameSpace} from '../../const';
import { State } from '../../types/state';
import { UserProcessState } from '../../types/state';

const getUserProcessSlice = (state: State): UserProcessState => state[NameSpace.User];

export const getAuthorizationStatus = createSelector(
  [getUserProcessSlice],
  (state: UserProcessState) => state.authorizationStatus
);

export const getUserEmail = createSelector(
  [getUserProcessSlice],
  (state: UserProcessState) => state.userEmail
);
