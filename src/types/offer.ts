export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
  };

export type City = {
  name: string;
  location: Location;
  };

export type BaseOffer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
};

export type Offer = BaseOffer & {
  previewImage: string;
  };

export type Host= {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  };

export type DetailedOffer = BaseOffer & {
  description: string;
  bedrooms: number;
  goods: string[];
  host: Host;
  images: string[];
  maxAdults: number;
  }


export type Offers = Offer[];

export type DetailedOffers = DetailedOffer [];


