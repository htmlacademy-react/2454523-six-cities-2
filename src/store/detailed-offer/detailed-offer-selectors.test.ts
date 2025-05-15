import { NameSpace } from '../../const';
import { makeFakeDetailedOffer, makeFakeOffer } from '../../utils-mocks/mocks';
import { getDetailedOffer, getIsDetailedOfferFetchingError, getIsDetailedOfferLoading, getNighboringOffers } from './detailed-offer-selectors';

describe('Detailed Offer Selectors', ()=> {

  const fakeOffer = makeFakeOffer();
  const fakeDetailedOffer = makeFakeDetailedOffer();

  const state = {
    [NameSpace.DetailedOffer]: {
      detailedOffer: fakeDetailedOffer,
      neighboringOffers:[fakeOffer],
      isDetailedOfferLoading: true,
      isDetailedOfferFetchingError: false
    }
  };

  it('should return detailedOffer from State', ()=> {
    const {detailedOffer} = state[NameSpace.DetailedOffer];
    const result = getDetailedOffer(state);
    expect(result).toEqual(detailedOffer);
  });

  it('should return neighboringOffers from State', ()=> {
    const {neighboringOffers} = state[NameSpace.DetailedOffer];
    const result = getNighboringOffers(state);
    expect(result).toEqual(neighboringOffers);
  });

  it('should return DetailedOffeLoading status from State', ()=> {
    const {isDetailedOfferLoading} = state[NameSpace.DetailedOffer];
    const result = getIsDetailedOfferLoading(state);
    expect(result).toBe(isDetailedOfferLoading);
  });

  it('should return DetailedOfferFetchingError status from State', ()=> {
    const {isDetailedOfferFetchingError} = state[NameSpace.DetailedOffer];
    const result = getIsDetailedOfferFetchingError(state);
    expect(result).toBe(isDetailedOfferFetchingError);
  });
});
