import {NameSpace} from '../../const';
import {State} from '../../types/state';
import { DetailedOffer, Offers } from '../../types/offer';

export const getDetailedOffer = (state: State): DetailedOffer | null => state[NameSpace.DetailedOffer].detailedOffer;
export const getnNighboringOffers = (state: State): Offers => state[NameSpace.DetailedOffer].neighboringOffers;
export const getIsDetailedOfferLoading = (state: State): boolean => state[NameSpace.DetailedOffer].isDetailedOfferLoading;
export const getIsDetailedOfferFetchingError = (state: State): boolean => state[NameSpace.DetailedOffer].isDetailedOfferFetchingError;
