import { Offers } from '../types/offer';
import { AVATAR_URL } from '../const';

export const neighboringOffers: Offers =
  [
    {
      id: '1',
      title: 'Beautiful & luxurious neighboring studio at great location',
      type: 'apartment',
      price: 120,
      city: {
        name: 'Amsterdam',
        location: {
          latitude: 52.3919553943508,
          longitude: 4.85409666406198,
          zoom: 8
        }
      },
      location: {
        latitude: 52.3919553943508,
        longitude: 4.85409666406198,
        zoom: 8
      },
      isFavorite: false,
      isPremium: false,
      rating: 2,
      previewImage: `${AVATAR_URL}?rnd=${Math.random()}`
    },
    {
      id: '2',
      title: 'Beautiful & luxurious neighboring studio at great location2',
      type: 'apartment',
      price: 150,
      city: {
        name: 'Amsterdam',
        location: {
          latitude: 52.3629553943508,
          longitude: 4.85509666406198,
          zoom: 7
        }
      },
      location: {
        latitude: 52.3629553943508,
        longitude: 4.85509666406198,
        zoom: 7
      },
      isFavorite: true,
      isPremium: false,
      rating: 5,
      previewImage: `${AVATAR_URL}?rnd=${Math.random()}`
    },
    {
      id: '3',
      title: 'Beautiful & luxurious neighboring studio at great location3',
      type: 'house',
      price: 180,
      city: {
        name: 'Amsterdam',
        location: {
          latitude: 52.3939553943508,
          longitude: 4.926309666406198,
          zoom: 8
        }
      },
      location: {
        latitude: 52.3939553943508,
        longitude: 4.926309666406198,
        zoom: 8
      },
      isFavorite: true,
      isPremium: true,
      rating: 3,
      previewImage: `${AVATAR_URL}?rnd=${Math.random()}`
    },
  ];
