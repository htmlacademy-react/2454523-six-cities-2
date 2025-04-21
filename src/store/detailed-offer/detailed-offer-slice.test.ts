import { detailedOfferSlice, dropOffer } from './detailed-offer-slice';
import { makeFakeDetailedOffer, makeFakeOffer } from '../../utilsMocks/mocks';
import { fetchDetailedOfferAction } from '../api-actions';

describe ('DetailedOffer Slice', ()=> {
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

  it(`should set "detailedOffer" to Object with DetailedOffer,
   "neighboringOffers" to array with Offer,
   "isDetailedOfferLoading" to "false",
   "isDetailedOfferFetchingError" to "false"
   with "fetchDetailedOfferAction.fulfilled"`,

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

});
