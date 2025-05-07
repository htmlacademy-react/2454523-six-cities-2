import { createSelector } from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {State, FiltersSliceState } from '../../types/state';

const getFiltersSlice = (state: Pick<State, NameSpace.Filters>): FiltersSliceState => state[NameSpace.Filters];

export const getCity = createSelector(
  [getFiltersSlice],
  (state: FiltersSliceState) => state.city
);
export const getSortType = createSelector(
  [getFiltersSlice],
  (state: FiltersSliceState) => state.sortType

);
