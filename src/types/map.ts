import { DetailedOffer, Offer, Offers } from './offer';

export type AmsterdamCenterCoords = {
  title: string;
  lat: number;
  lng: number;
  zoom: number;
}

export type CityCoords = {
  title: string;
  lat: number;
  lng: number;
  zoom: number;
}

export type MapProps ={
  block: string;
  location: AmsterdamCenterCoords | undefined;
  offers: Offers;
  selectedOffer?: Offer;
  currentOffer?: DetailedOffer;
}
