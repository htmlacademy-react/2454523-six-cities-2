import { SortType } from '../const';
import { Offers } from '../types/offer';

export const sortOffers = (offers: Offers, sortType: string) => {
  switch (sortType){
    case SortType.PriceLowToHigh:
      return [...offers].sort((offerA, offerB) => offerA.price - offerB.price);

    case SortType.PriceHighToLow:
      return [...offers].sort((offerA, offerB) => offerB.price - offerA.price);

    case SortType.TopRatedFirst:
      return [...offers].sort((offerA, offerB) => offerB.rating - offerA.rating);

    default:
      return offers;

  }
};
