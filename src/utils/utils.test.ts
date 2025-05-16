import { makeFakeComment, makeFakeOffer } from '../utils-mocks/mocks';
import { prepareReviewData, getOffersByCity, getCityCoords, getRandomCity } from './utils';
import {СITIES_COORDS} from '../const';
import {vi, afterEach } from 'vitest';


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

describe('Function: getRandomCity', () => {
  const cities = ['Paris', 'Cologne', 'Brussels'];

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return the first city when Math.random() returns 0', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    expect(getRandomCity(cities)).toBe('Paris');
  });

  it('should return the last city when Math.random() returns a value close to 1', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.9999);
    expect(getRandomCity(cities)).toBe('Brussels');
  });

  it('should return the middle city when Math.random() returns 0.5', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    expect(getRandomCity(cities)).toBe('Cologne');
  });

  it('should return undefined for an empty array', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    expect(getRandomCity([])).toBeUndefined();
  });
});
