import { store } from '../store/index.ts';
import { City, Offers, DetailedOffer } from './offer.ts';
import { Reviews } from './review.ts';
import { AuthorizationStatus } from '../const';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type InitialState ={
  city: City['name'];
  sortType: string;

  offers: Offers;
  isOffersDataLoading: boolean;
  isOffersFetchingError: boolean;

  neighboringOffers: Offers;
  detailedOffer:DetailedOffer | null;
  isDetailedOfferLoading: boolean;
  isDetailedOfferFetchingError: boolean;

  favorites: Offers;
  isFavoritesLoading: boolean;
  isFavoritesFetchingError: boolean;

  authorizationStatus: AuthorizationStatus;
  userEmail: string|null;

  error: string|null;

  isSubmitting: boolean;
  isSubmittingFailed: boolean;
  isReviewsLoading:boolean;
  reviews: Reviews;
  isReviewsFetchingError: boolean;

};

export type UserProcessState = Pick<InitialState, 'authorizationStatus' | 'userEmail'>;
export type OffersState = Pick<InitialState, 'offers' | 'isOffersDataLoading'| 'isOffersFetchingError'>;
export type DetailedOfferState = Pick<InitialState, 'neighboringOffers' | 'detailedOffer' | 'isDetailedOfferLoading' | 'isDetailedOfferFetchingError'>;

export type DetailedOfferPayload = {
  detailedOffer: DetailedOffer;
  neighboringOffers: Offers;
}

export type FiltersSliceState = Pick<InitialState, 'city'| 'sortType'>;

export type ErrorState = Pick<InitialState, 'error'>

export type FavoritesState = Pick<InitialState, 'favorites' | 'isFavoritesLoading' | 'isFavoritesFetchingError'>

export type ReviewsState = Pick<InitialState, 'isSubmitting'| 'isSubmittingFailed' | 'isReviewsLoading' | 'reviews' | 'isReviewsFetchingError'>
