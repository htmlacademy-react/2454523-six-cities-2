import { DetailedOffer, Offer, Offers } from './offer';

export type CityCoords = {
  title: string;
  lat: number;
  lng: number;
  zoom: number;
}

export type MapProps ={
  block: string;
  location: CityCoords;
  offers: Offers;
  selectedOffer?: Offer;
  currentOffer?: DetailedOffer;
}
