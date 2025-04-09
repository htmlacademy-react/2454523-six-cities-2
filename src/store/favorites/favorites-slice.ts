import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { FavoritesState } from '../../types/state';
import { addToFavorites, fetchFavoritesOffersAction, removeFromFavorites } from '../api-actions';


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
      })
      .addCase(addToFavorites.fulfilled, (state, action)=> {
        state.favorites.push(action.payload);
      })
      .addCase(removeFromFavorites.fulfilled, (state, action)=> {
        state.favorites = state.favorites.filter((offer)=> offer.id !== action.payload.id);
      });
  }
});


