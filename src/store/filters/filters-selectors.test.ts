import { CITIES, NameSpace, SortType } from '../../const';
import { getCity, getSortType } from './filters-selectors';

describe('Filters Selectors', ()=> {

  const state = {
    [NameSpace.Filters]: {
      city: CITIES[1],
      sortType: SortType.PriceLowToHigh
    }
  };

  it('should return city from State', ()=> {
    const {city} = state[NameSpace.Filters];
    const result = getCity(state);
    expect(result).toBe(city);
  });

  it('should return sortType from State', ()=> {
    const {sortType} = state[NameSpace.Filters];
    const result = getSortType(state);
    expect(result).toBe(sortType);
  });


});
