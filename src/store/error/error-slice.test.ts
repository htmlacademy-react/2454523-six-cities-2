import { errorSlice, setError } from './error-slice';


describe('Error Slice', ()=> {
  it('should return initial state with empty action', ()=> {
    const emptyAction = {type: ''};
    const expectedState = {error: null};

    const result = errorSlice.reducer(expectedState,emptyAction);

    expect(result).toEqual(expectedState);
  });

  it ('should return default initial state with empty action and undefined state', ()=> {
    const emptyAction = {type: ''};
    const expectedState = {error: null};

    const result = errorSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it ('should show Error with "setError" action', ()=> {
    const errorMessage = 'Проверка';
    const expectedState = {error: errorMessage};

    const result = errorSlice.reducer(undefined, setError(errorMessage));

    expect(result).toEqual(expectedState);
  });
});

