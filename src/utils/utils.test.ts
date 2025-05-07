import { makeFakeComment, makeFakeOffer } from '../utilsMocks/mocks';
import { prepareReviewData, getOffersByCity, getCityCoords } from './utils';
import {СITIES_COORDS} from '../const';

describe('Function: prepareReviewData', () => {

  it('should return correct keyValue, formattedDate and dateTimeValue', () => {

    const review = {
      ...makeFakeComment(),
      id: 'abc',
      date: '2020-12-01T00:00:00.000Z',
    };

    const result = prepareReviewData(review);

    expect(result.keyValue).toBe('abc');
    expect(result.formattedDate).toBe('December 2020');
    expect(result.dateTimeValue).toBe('2020-12-01');
  });

});

describe('Function: getOffersByCity', () => {

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

  it('should filter offers by given city name', () => {

    const offers = [offerParis1, offerBerlin, offerParis2];

    const resultParis = getOffersByCity(offers, 'Paris');
    const resultBerlin = getOffersByCity(offers, 'Berlin');

    expect(resultParis).toEqual([offerParis1, offerParis2]);
    expect(resultBerlin).toEqual([offerBerlin]);
    expect(resultParis).toHaveLength(2);
    expect(resultBerlin).toHaveLength(1);
  });

  it('should return an empty array if no offers match the city', () => {
    const offers = [offerParis1, offerBerlin];
    const result = getOffersByCity(offers, 'Rome');
    expect(result).toEqual([]);
  });

});

describe('Function: getCityCoords', () => {

  it('should return coords for existing city', () => {
    const city = 'Cologne';

    const result = getCityCoords(СITIES_COORDS, city);
    expect(result).toEqual(СITIES_COORDS[1]);
  });

  it('should return default coords when city not found', () => {
    const city = 'Moscow';

    const result = getCityCoords(СITIES_COORDS, city);
    expect(result).toEqual(СITIES_COORDS[0]);
  });

});
