import { makeFakeOffer } from '../utilsMocks/mocks';
import { groupFavoriteOffersByCity } from './groupFavoriteOffers';

describe('Function: "groupFavoriteOffersByCity"', ()=> {

  it ('should group offers by city name', ()=> {
    const offerParis1 = {
      ...makeFakeOffer(),
      city:
      { name: 'Paris',
        location: { latitude:1, longitude:1, zoom: 1 }
      }};
    const offerBerlin = {
      ...makeFakeOffer()
      , city:
        { name: 'Berlin',
          location: { latitude:2, longitude:2, zoom: 2 }
        }};
    const offerParis2 = {
      ...makeFakeOffer(),
      city:
         { name: 'Paris',
           location: { latitude:1, longitude:1, zoom: 1 }
         }};


    const favorites = [offerParis1, offerBerlin, offerParis2];

    const result = groupFavoriteOffersByCity(favorites);

    expect(result).toEqual({
      Paris:  [offerParis1, offerParis2],
      Berlin: [offerBerlin],
    });
  });

  it('should return an empty object when no favorites provided', () => {
    const result = groupFavoriteOffersByCity([]);
    expect(result).toEqual({});
  });

  it('should group correctly when all offers are from the same city', () => {
    const offerParis1 = {
      ...makeFakeOffer(),
      city:
      { name: 'Paris',
        location: { latitude:1, longitude:1, zoom: 1 }
      }};

    const offerParis2 = {
      ...makeFakeOffer(),
      city:
         { name: 'Paris',
           location: { latitude:1, longitude:1, zoom: 1 }
         }};

    const favorites = [offerParis1, offerParis2];

    const result = groupFavoriteOffersByCity(favorites);

    expect(Object.keys(result)).toHaveLength(1);
    expect(result.Paris).toEqual([offerParis1, offerParis2]);
  });

});
