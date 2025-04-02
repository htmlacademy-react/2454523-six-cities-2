import {AuthorizationStatus, NameSpace} from '../../const';
import { State } from '../../types/state';

export const getAuthorizationStatus = (state: State): AuthorizationStatus =>state[NameSpace.User].authorizationStatus;
export const getUserEmail = (state: State): string | null =>state[NameSpace.User].userEmail;
export const getAuthCheckedStatus = (state: State): boolean => state[NameSpace.User].authorizationStatus !== AuthorizationStatus.Unknown;
