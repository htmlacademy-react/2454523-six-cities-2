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

export enum SortType {
  Popular = 'Popular',
  PriceLowToHigh = 'Price:low to high',
  PriceHighToLow = 'Price:high to low',
  TopRatedFirst = 'Top rated first'
}

export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const AVATAR_URL = 'https://i.pravatar.cc/128';

export const STARS_RAITING = ['perfect', 'good', 'not bad', 'badly', 'terribly'];

export const MIN_COMMENT_LENGTH = 50;

export const MAX_COMMENT_LENGTH = 300;

export const MAX_COUNT_NEAR_OFFERS = 3;

export const TILE_LAYER =
'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

export const COPYRIGHT =
'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';


export const СITIES_COORDS = [
  {
    title: 'Paris',
    lat: 48.8566,
    lng: 2.3522,
    zoom: 10
  },
  {
    title: 'Cologne',
    lat: 50.9375,
    lng: 6.9603,
    zoom: 10
  },
  {
    title: 'Brussels',
    lat: 50.8503,
    lng: 4.3517,
    zoom: 10
  },
  {
    title: 'Amsterdam',
    lat: 52.3676,
    lng: 4.9041,
    zoom: 10
  },
  {
    title: 'Hamburg',
    lat: 53.5511,
    lng: 9.9937,
    zoom: 10
  },
  {
    title: 'Dusseldorf',
    lat: 51.2277,
    lng: 6.7735,
    zoom: 10
  }
];

export enum ApiRoute {
  Offers = '/offers',
  Favorite ='/favorite',
  Login = '/login',
  Logout = '/logout',
}

export const TIMEOUT_SHOW_ERROR = 2000;
