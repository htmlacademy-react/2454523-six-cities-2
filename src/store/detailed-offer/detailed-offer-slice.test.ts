import { detailedOfferSlice, dropOffer } from './detailed-offer-slice';
import { makeFakeDetailedOffer, makeFakeOffer } from '../../utilsMocks/mocks';
import { addToFavorites, fetchDetailedOfferAction, removeFromFavorites } from '../api-actions';

describe ('DetailedOfferSlice', ()=> {
  it ('should return initial state with empty action', ()=> {
    const emptyAction = {type: ''};
    const expectedState = {
      neighboringOffers:[],
      detailedOffer:null,
      isDetailedOfferLoading: true,
      isDetailedOfferFetchingError: false};

    const result = detailedOfferSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);

  });

  it ('should return default initial state with empty action and undefined state', ()=> {
    const emptyAction = {type: ''};
    const expectedState = {
      neighboringOffers:[],
      detailedOffer:null,
      isDetailedOfferLoading: true,
      isDetailedOfferFetchingError: false};

    const result = detailedOfferSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should drop offer with "dropOffer" action', ()=> {
    const detailedOffer = makeFakeDetailedOffer();
    const offer = makeFakeOffer();

    const initialState = {
      neighboringOffers:[offer],
      detailedOffer: detailedOffer,
      isDetailedOfferLoading: true,
      isDetailedOfferFetchingError: false
    };

    const expectedState = {
      neighboringOffers:[],
      detailedOffer: null,
      isDetailedOfferLoading: true,
      isDetailedOfferFetchingError: false
    };

    const result = detailedOfferSlice.reducer(initialState, dropOffer);

    expect(result).toEqual(expectedState);
  });

  it(`should set "isDetailedOfferLoading" to "true",
      "isDetailedOfferFetchingError" to "false" ,
       "detailedOffer" to "null" with "fetchDetailedOfferAction.pending"`,

  ()=> {
    const expectedState = {
      neighboringOffers:[],
      detailedOffer: null,
      isDetailedOfferLoading: true,
      isDetailedOfferFetchingError: false
    };

    const result = detailedOfferSlice.reducer(undefined, fetchDetailedOfferAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('loads detailed offer and neighbors on fetchDetailedOfferAction.fulfilled',

    ()=> {

      const detailedOffer = makeFakeDetailedOffer();
      const offer = makeFakeOffer();

      const expectedState = {
        neighboringOffers:[offer],
        detailedOffer: detailedOffer,
        isDetailedOfferLoading: false,
        isDetailedOfferFetchingError: false
      };

      const action = fetchDetailedOfferAction.fulfilled(
        {
          detailedOffer,
          neighboringOffers: [offer]
        },
        '',
        detailedOffer.id,
      );

      const result = detailedOfferSlice.reducer(undefined, action);

      expect(result).toEqual(expectedState);
    });

  it(`should set "isDetailedOfferLoading" to "false",
    "isDetailedOfferFetchingError" to "true"
    with "fetchDetailedOfferAction.rejected"`,

  ()=> {
    const expectedState = {
      neighboringOffers:[],
      detailedOffer: null,
      isDetailedOfferLoading: false,
      isDetailedOfferFetchingError: true
    };

    const result = detailedOfferSlice.reducer(undefined, fetchDetailedOfferAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it ('should set detailedOffer.isFavorite to true with "addToFavorites.fulfilled"', ()=> {
    const notFavoriteDetailedOffer = { ...makeFakeDetailedOffer(), isFavorite: false, id: '1' };
    const updatedOffer = {...makeFakeOffer(), id: '1', };

    const initialState = {
      neighboringOffers:[],
      detailedOffer: notFavoriteDetailedOffer,
      isDetailedOfferLoading: false,
      isDetailedOfferFetchingError: false
    };


    const result = detailedOfferSlice.reducer(initialState, addToFavorites.fulfilled(updatedOffer, '', notFavoriteDetailedOffer.id));

    expect(result.detailedOffer?.isFavorite).toBe(true);
  });

  it ('should set detailedOffer.isFavorite to false with "removeFromFavorites.fulfilled"', ()=> {
    const favoriteDetailedOffer = { ...makeFakeDetailedOffer(), isFavorite: true, id: '1' };
    const updatedOffer = {...makeFakeOffer(), id: '1', };

    const initialState = {
      neighboringOffers:[],
      detailedOffer: favoriteDetailedOffer,
      isDetailedOfferLoading: false,
      isDetailedOfferFetchingError: false
    };


    const result = detailedOfferSlice.reducer(initialState, removeFromFavorites.fulfilled(updatedOffer, '', favoriteDetailedOffer.id));

    expect(result.detailedOffer?.isFavorite).toBe(false);
  });

});
