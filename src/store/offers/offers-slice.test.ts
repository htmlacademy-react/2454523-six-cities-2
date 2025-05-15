import { offersSlice } from './offers-slice';
import { makeFakeOffer } from '../../utils-mocks/mocks';
import { fetchOffersAction, addToFavorites,removeFromFavorites } from '../api-actions';

describe ('DetailedOfferSlice', ()=> {
  it ('should return initial state with empty action', ()=> {
    const emptyAction = {type: ''};
    const offer = makeFakeOffer();

    const expectedState = {
      offers:[offer],
      isOffersDataLoading: false,
      isOffersFetchingError: false};

    const result = offersSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);

  });

  it ('should return default initial state with empty action and undefined state', ()=> {
    const emptyAction = {type: ''};
    const expectedState = {
      offers:[],
      isOffersDataLoading: false,
      isOffersFetchingError: false
    };

    const result = offersSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });


  it(`should set "isOffersDataLoading" to "true",
      "isOffersFetchingError" to "false" ,
      with "fetchOffersAction.pending"`,

  ()=> {
    const expectedState = {
      offers:[],
      isOffersDataLoading: true,
      isOffersFetchingError: false
    };

    const result = offersSlice.reducer(undefined, fetchOffersAction.pending);

    expect(result).toEqual(expectedState);
  });

  it(`should set "offers" to array  with Offer,
   "isOffersDataLoading" to "false",
   "isOffersFetchingError" to "false"
   with "fetchOffersAction.fulfilled"`,

  ()=> {

    const offer = makeFakeOffer();

    const expectedState = {
      offers:[offer],
      isOffersDataLoading: false,
      isOffersFetchingError: false
    };

    const action = fetchOffersAction.fulfilled(
      [offer],
      '',
      undefined,
    );

    const result = offersSlice.reducer(undefined, action);

    expect(result).toEqual(expectedState);
  });

  it(`should set "isOffersDataLoading" to "false",
    "isOffersFetchingError" to "true"
    with "fetchOffersAction.rejected"`,

  ()=> {
    const expectedState = {
      offers:[],
      isOffersDataLoading: false,
      isOffersFetchingError: true
    };

    const result = offersSlice.reducer(undefined, fetchOffersAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it ('should set offer.isFavorite to true with "addToFavorites.fulfilled"', ()=> {
    const offer = { ...makeFakeOffer(), isFavorite: false };
    const initialState = {
      offers:[offer],
      isOffersDataLoading: false,
      isOffersFetchingError: false
    };

    const result = offersSlice.reducer(initialState, addToFavorites.fulfilled(offer, '', offer.id));

    expect(result.offers[0].isFavorite).toBe(true);
  });

  it ('should set offer.isFavorite to false with "removeFromFavorites.fulfilled"', ()=> {
    const offer = { ...makeFakeOffer(), isFavorite: true };
    const initialState = {
      offers:[offer],
      isOffersDataLoading: false,
      isOffersFetchingError: false
    };

    const result = offersSlice.reducer(initialState, removeFromFavorites.fulfilled(offer, '', offer.id));

    expect(result.offers[0].isFavorite).toBe(false);
  });

});
