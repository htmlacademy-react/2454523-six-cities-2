import { CityCoords } from '../types/map';
import { Offers } from '../types/offer';
import {Review} from '../types/review';

const prepareReviewData = (review: Review) => {
  const reviewDate = new Date(review.date);

  return {
    keyValue: `${review.id}`,
    formattedDate: reviewDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    }),
    dateTimeValue: reviewDate.toISOString().split('T')[0],
  };
};

const getOffersByCity = (offers: Offers, cityName: string) =>
  offers.filter((offer) => offer.city.name === cityName);


const getCityCoords = (cities: CityCoords[], cityName: string): CityCoords => {
  const foundCity = cities.find((city) => city.title === cityName);
  if (!foundCity) {
    return { title: 'Paris', lat: 48.8566, lng: 2.3522, zoom: 10 };
  }
  return foundCity;
};

export {prepareReviewData, getOffersByCity, getCityCoords};
