import { NameSpace } from '../../const';
import { AuthorizationStatus } from '../../const';
import { getAuthorizationStatus, getUserEmail } from './user-process-selectors';

describe('User-Process Selectors', ()=> {

  const state = {
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Auth,
      userEmail: 'test',
    }
  };

  it('should return authorizationStatus from State', ()=> {
    const {authorizationStatus} = state[NameSpace.User];
    const result = getAuthorizationStatus(state);
    expect(result).toBe(authorizationStatus);
  });

  it('should return userEmail from State', ()=> {
    const {userEmail} = state[NameSpace.User];
    const result = getUserEmail(state);
    expect(result).toBe(userEmail);
  });


});
