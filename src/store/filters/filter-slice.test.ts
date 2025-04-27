import { filtersSlice, changeCity, changeSortOptions } from './filters-slice';
import { CITIES, SortType } from '../../const';


describe ('filtersSlice', ()=> {
  it ('should return initial state with empty action', ()=> {
    const emptyAction = {type: ''};
    const expectedState = {
      city: CITIES[1],
      sortType: SortType.PriceHighToLow,};

    const result = filtersSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);

  });

  it ('should return default initial state with empty action and undefined state', ()=> {
    const emptyAction = {type: ''};
    const expectedState = {
      city: CITIES[0],
      sortType: SortType.Popular};

    const result = filtersSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set city with "changeCity" action', ()=> {

    const initialState = {
      city: CITIES[1],
      sortType: SortType.PriceLowToHigh,
    };

    const expectedState = {
      city: CITIES[2],
      sortType: SortType.PriceLowToHigh,
    };

    const result = filtersSlice.reducer(initialState, changeCity(CITIES[2]));

    expect(result).toEqual(expectedState);
  });

  it('should set sortOption with "changeSortOptions" action', ()=> {

    const initialState = {
      city: CITIES[1],
      sortType: SortType.PriceLowToHigh,
    };

    const expectedState = {
      city: CITIES[1],
      sortType: SortType.TopRatedFirst,
    };

    const result = filtersSlice.reducer(initialState, changeSortOptions(SortType.TopRatedFirst));

    expect(result).toEqual(expectedState);
  });


});
