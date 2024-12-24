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
