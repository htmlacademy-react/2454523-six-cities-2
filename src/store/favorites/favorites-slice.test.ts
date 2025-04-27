import { favoritesSlice } from './favorites-slice';
import { makeFakeOffer } from '../../utilsMocks/mocks';
import { fetchFavoritesOffersAction, addToFavorites, removeFromFavorites } from '../api-actions';

describe ('FavoritesSlice', ()=> {
  it ('should return initial state with empty action', ()=> {
    const emptyAction = {type: ''};
    const expectedState = {
      favorites: [],
      isFavoritesLoading: true,
      isFavoritesFetchingError: false};

    const result = favoritesSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);

  });

  it ('should return default initial state with empty action and undefined state', ()=> {
    const emptyAction = {type: ''};
    const expectedState = {
      favorites: [],
      isFavoritesLoading: true,
      isFavoritesFetchingError: false};

    const result = favoritesSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it(`should set "isFavoritesLoading" to "true"
    with "fetchFavoritesOffersAction.pending"`,

  ()=> {
    const expectedState = {
      favorites: [],
      isFavoritesLoading: true,
      isFavoritesFetchingError: false
    };

    const result = favoritesSlice.reducer(undefined, fetchFavoritesOffersAction.pending);

    expect(result).toEqual(expectedState);
  });

  it(`should set "favorites" to array with Offer,
   "isFavoritesLoading" to "false",
   with "fetchFavoritesOffersAction.fulfilled"`,

  ()=> {

    const offer = makeFakeOffer();

    const expectedState = {
      favorites: [offer],
      isFavoritesLoading: false,
      isFavoritesFetchingError: false
    };

    const action = fetchFavoritesOffersAction.fulfilled([offer],
      '',
      undefined,
    );

    const result = favoritesSlice.reducer(undefined, action);

    expect(result).toEqual(expectedState);
  });

  it(`should set "isFavoritesLoading" to "false",
    "isFavoritesFetchingError" to "true"
    with fetchFavoritesOffersAction.rejected`,

  ()=> {
    const expectedState = {
      favorites: [],
      isFavoritesLoading: false,
      isFavoritesFetchingError: true
    };

    const result = favoritesSlice.reducer(undefined, fetchFavoritesOffersAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it ('should add to Favorites with "addToFavorites.fulfilled"', ()=> {
    const offer = makeFakeOffer();
    const expectedState = {
      favorites: [offer],
      isFavoritesLoading: true,
      isFavoritesFetchingError: false
    };

    const result = favoritesSlice.reducer(undefined, addToFavorites.fulfilled(offer, '', offer.id));

    expect(result).toEqual(expectedState);
  });

  it ('should remove from Favorites with "removeFromFavorites.fulfilled"', ()=> {
    const offer = makeFakeOffer();

    const initialState = {
      favorites: [offer],
      isFavoritesLoading: true,
      isFavoritesFetchingError: false
    };

    const expectedState = {
      favorites: [],
      isFavoritesLoading: true,
      isFavoritesFetchingError: false
    };

    const result = favoritesSlice.reducer(initialState, removeFromFavorites.fulfilled(offer, '', offer.id));

    expect(result).toEqual(expectedState);
  });

});
