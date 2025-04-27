import { userProcessSlice } from './user-process-slice';
import { AuthorizationStatus } from '../../const';
import { checkAuthAction,loginAction, logoutAction } from '../api-actions';
import { AUTH_EMAIL_KEY_NAME } from '../../services/email';
import { UserData } from '../../types/user-data';
import { AuthData } from '../../types/auth-data';


describe ('UserProcessSlice', ()=> {
  it ('should return initial state with empty action', ()=> {
    const emptyAction = {type: ''};
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userEmail: null
    };

    const result = userProcessSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);

  });

  it ('should return default initial state with empty action and undefined state', ()=> {
    const emptyAction = {type: ''};
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userEmail: null,
    };

    const result = userProcessSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it(`should set authorizationStatus to "Auth"
     and userEmail from localStorage with checkAuthAction.fulfilled`,

  ()=> {

    localStorage.setItem(AUTH_EMAIL_KEY_NAME, 'test@mail.com');

    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      userEmail: 'test@mail.com',
    };

    const result = userProcessSlice.reducer(undefined, checkAuthAction.fulfilled(undefined, '', undefined));

    expect(result).toEqual(expectedState);
  });


  it(`should set authorizationStatus to "NoAuth"
    with checkAuthAction.rejected`,

  ()=> {

    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userEmail: null
    };

    const result = userProcessSlice.reducer(undefined, checkAuthAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it(`should set authorizationStatus to "Auth", add userEmail in State
    with loginAction.fulfilled`,

  ()=> {

    const mockUserData: UserData = {
      name: 'Иван Иванов',
      avatarUrl: 'https://example.com/avatar.png',
      isPro: true,
      email: 'test@mail.com',
      token: 'jwt-token-123',
    };

    const mockAuthData: AuthData = {
      email: 'test@mail.com',
      password: 'supersecret',
    };

    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      userEmail: 'test@mail.com'
    };

    const result = userProcessSlice.reducer(undefined, loginAction.fulfilled(mockUserData, '', mockAuthData));

    expect(result).toEqual(expectedState);
  });

  it(`should set authorizationStatus to "NoAuth"
    with loginAction.rejected`,

  ()=> {

    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userEmail: null
    };

    const result = userProcessSlice.reducer(undefined, loginAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it(`should set authorizationStatus to "NoAuth"
    with logoutAction.fulfilled`,

  ()=> {

    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userEmail: null
    };

    const result = userProcessSlice.reducer(undefined, logoutAction.fulfilled);

    expect(result).toEqual(expectedState);
  });

});
