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

const getCentralCityCoords = (cities: CityCoords[], cityName: string) => cities.find((city) => city.title === cityName);

export {prepareReviewData, getOffersByCity, getCentralCityCoords};
