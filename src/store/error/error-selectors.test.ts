import { NameSpace } from '../../const';
import { getError } from './error-selectors';

describe('Error Selectors', ()=> {

  const state = {
    [NameSpace.Error]: {
      error: 'error-message'
    }
  };

  it('should return Error from State', ()=> {
    const {error} = state[NameSpace.Error];
    const result = getError(state);
    expect(result).toBe(error);
  });
});
