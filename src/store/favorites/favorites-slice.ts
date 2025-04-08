import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { FavoritesState } from '../../types/state';
import { fetchFavoritesOffersAction } from '../api-actions';


const initialState: FavoritesState = {
  favorites: [],
  isFavoritesLoading: true,
  isFavoritesFetchingError: false
};

export const favoritesSlice = createSlice ({
  name: NameSpace.Favorites,
  initialState,
  reducers: {},
  extraReducers(builder){
    builder
      .addCase(fetchFavoritesOffersAction.pending, (state)=> {
        state.isFavoritesLoading = true;
      })
      .addCase(fetchFavoritesOffersAction.fulfilled, (state, action)=> {
        state.favorites = action.payload;
        state.isFavoritesLoading = false;
      })
      .addCase(fetchFavoritesOffersAction.rejected, (state)=> {
        state.isFavoritesLoading = false;
        state.isFavoritesFetchingError = true;
      });
  }
});


