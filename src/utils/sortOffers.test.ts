import { SortType } from '../const';
import { makeFakeOffer } from '../utils-mocks/mocks';
import { sortOffers } from './sortOffers';


describe('Function: "sortOffers"', ()=> {

  it ('should sort offers by price from low to high', ()=> {

    const offerWithLowPrice = {
      ...makeFakeOffer(),
      price: 100
    };

    const offerWithHighPrice = {
      ...makeFakeOffer(),
      price: 200
    };

    const offers = [offerWithHighPrice, offerWithLowPrice ];

    const result = sortOffers(offers, SortType.PriceLowToHigh);

    expect(result).toEqual([offerWithLowPrice, offerWithHighPrice]);

  });

  it('should sort offers by price from high to low', () => {
    const offerWithLowPrice = {
      ...makeFakeOffer(),
      price: 100
    };

    const offerWithHighPrice = {
      ...makeFakeOffer(),
      price: 200
    };

    const offers = [offerWithHighPrice, offerWithLowPrice ];

    const result = sortOffers(offers, SortType.PriceHighToLow);

    expect(result).toEqual([offerWithHighPrice, offerWithLowPrice]);

  });

  it('should sort offers by rating from high to low', () => {
    const offerWithHighRating = {
      ...makeFakeOffer(),
      rating: 5
    };

    const offerWithLowRating = {
      ...makeFakeOffer(),
      rating: 1
    };

    const offers = [offerWithLowRating, offerWithHighRating ];

    const result = sortOffers(offers, SortType.TopRatedFirst);

    expect(result).toEqual([offerWithHighRating, offerWithLowRating]);
  });

  it('should return the original array when sort type is default', () => {
    const offer1 = makeFakeOffer();
    const offer2 = makeFakeOffer();


    const offers = [offer1, offer2 ];

    const result = sortOffers(offers, SortType.Popular);

    expect(result).toBe(offers);
  });

});
