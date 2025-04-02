import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, CITIES, SortType } from '../../const';
import { FiltersSliceState } from '../../types/state';
import { City } from '../../types/offer';


const initialState: FiltersSliceState = {
  city: CITIES[0],
  sortType: SortType.Popular,
};

export const filtersSlice = createSlice({
  name: NameSpace.Filters,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<City['name']>) => {
      state.city = action.payload;
    },
    changeSortOptions: (state, action: PayloadAction<string>)=> {
      state.sortType = action.payload;
    }
  },
});

export const {changeCity, changeSortOptions } = filtersSlice.actions;
