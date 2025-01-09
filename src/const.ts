export const Setting = {
  RentalOffersCount: 15
} as const;

export enum AppRoute {
  Main = '/',
  Login= 'login',
  Favorites = 'favorites',
  Offer = 'offer'

}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTN',
  Unknown = 'UNKNOWN',
}

export const AVATAR_URL = 'https://i.pravatar.cc/128';

export const STARS_RAITING = ['perfect', 'good', 'not bad', 'badly', 'terribly'];
