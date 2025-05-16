import { NameSpace } from '../../const';
import { makeFakeOffer } from '../../utils-mocks/mocks';
import { getOffers, getIsOffersFetchingError, getIsOffersDataLoading } from './offers-selectors';


describe('Offers Selectors', ()=> {

  const fakeOffer = makeFakeOffer();

  const state = {
    [NameSpace.Offers]: {
      offers:[fakeOffer],
      isOffersDataLoading: true,
      isOffersFetchingError: false
    }
  };

  it('should return offers from State', ()=> {
    const {offers} = state[NameSpace.Offers];
    const result = getOffers(state);
    expect(result).toEqual(offers);
  });

  it('should return OffersDataLoading status from State', ()=> {
    const {isOffersDataLoading} = state[NameSpace.Offers];
    const result = getIsOffersDataLoading(state);
    expect(result).toBe(isOffersDataLoading);
  });

  it('should return OffersFetchingError status from State', ()=> {
    const {isOffersFetchingError} = state[NameSpace.Offers];
    const result = getIsOffersFetchingError(state);
    expect(result).toBe(isOffersFetchingError);
  });
});
