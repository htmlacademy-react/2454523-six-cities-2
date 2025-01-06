import { Offers, OfferDetails } from '../types/offer';

export const offers: Offers =
  [
    {
      id: '1',
      title: 'Beautiful & luxurious studio at great location',
      type: 'apartment',
      price: 120,
      city: {
        name: 'Amsterdam',
        location: {
          latitude: 52.35514938496378,
          longitude: 4.673877537499948,
          zoom: 8
        }
      },
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8
      },
      isFavorite: false,
      isPremium: false,
      rating: 4,
      previewImage: 'https://url-to-image/image.png'
    },
    {
      id: '2',
      title: 'Beautiful & luxurious studio at great location2',
      type: 'apartment',
      price: 150,
      city: {
        name: 'Netanya',
        location: {
          latitude: 53.35514938496378,
          longitude: 5.673877537499948,
          zoom: 7
        }
      },
      location: {
        latitude: 53.35514938496378,
        longitude: 5.673877537499948,
        zoom: 7
      },
      isFavorite: true,
      isPremium: false,
      rating: 5,
      previewImage: 'https://url-to-image/image.png'
    },
    {
      id: '3',
      title: 'Beautiful & luxurious studio at great location3',
      type: 'house',
      price: 180,
      city: {
        name: 'Tel-Aviv',
        location: {
          latitude: 55.35514938496378,
          longitude: 5.673877537499948,
          zoom: 8
        }
      },
      location: {
        latitude: 55.35514938496378,
        longitude: 5.673877537499948,
        zoom: 8
      },
      isFavorite: true,
      isPremium: true,
      rating: 3,
      previewImage: 'https://url-to-image/image.png'
    },
    {
      id: '4',
      title: 'Beautiful & luxurious studio at great location4',
      type: 'apartment',
      price: 200,
      city: {
        name: 'Moscow',
        location: {
          latitude: 58.35514938496378,
          longitude: 8.673877537499948,
          zoom: 9
        }
      },
      location: {
        latitude: 58.35514938496378,
        longitude: 8.673877537499948,
        zoom: 9
      },
      isFavorite: false,
      isPremium: true,
      rating: 4,
      previewImage: 'https://url-to-image/image.png'
    }
  ];

export const offerDetails: OfferDetails = {
  '1': {
    id: '1',
    title: 'Beautiful & luxurious studio at great location',
    type: 'apartment',
    price: 120,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8
      }
    },
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    },
    isFavorite: false,
    isPremium: false,
    rating: 4,
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    bedrooms: 3,
    goods: [
      'Heating'
    ],
    host: {
      name: 'Oliver Conner',
      avatarUrl: 'https://url-to-image/image.png',
      isPro: false
    },
    images: [
      'https://url-to-image/image.png'
    ],
    maxAdults: 4
  },
  '2': {
    id: '2',
    title: 'Beautiful & luxurious studio at great location2',
    type: 'apartment',
    price: 150,
    city: {
      name: 'Netanya',
      location: {
        latitude: 53.35514938496378,
        longitude: 5.673877537499948,
        zoom: 7
      }
    },
    location: {
      latitude: 53.35514938496378,
      longitude: 5.673877537499948,
      zoom: 7
    },
    isFavorite: true,
    isPremium: false,
    rating: 5,
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    bedrooms: 4,
    goods: [
      'Heating'
    ],
    host: {
      name: 'Jhone',
      avatarUrl: 'https://url-to-image/image.png',
      isPro: true
    },
    images: [
      'https://url-to-image/image.png'
    ],
    maxAdults: 3
  },
  '3': {
    id: '3',
    title: 'Beautiful & luxurious studio at great location3',
    type: 'house',
    price: 180,
    city: {
      name: 'Tel-Aviv',
      location: {
        latitude: 55.35514938496378,
        longitude: 5.673877537499948,
        zoom: 8
      }
    },
    location: {
      latitude: 55.35514938496378,
      longitude: 5.673877537499948,
      zoom: 8
    },
    isFavorite: true,
    isPremium: true,
    rating: 3,
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    bedrooms: 8,
    goods: [
      'Heating'
    ],
    host: {
      name: 'Sara Conner',
      avatarUrl: 'https://url-to-image/image.png',
      isPro: false
    },
    images: [
      'https://url-to-image/image.png'
    ],
    maxAdults: 2
  },
  '4': {
    id: '4',
    title: 'Beautiful & luxurious studio at great location4',
    type: 'apartment',
    price: 200,
    city: {
      name: 'Moscow',
      location: {
        latitude: 58.35514938496378,
        longitude: 8.673877537499948,
        zoom: 9
      }
    },
    location: {
      latitude: 58.35514938496378,
      longitude: 8.673877537499948,
      zoom: 9
    },
    isFavorite: false,
    isPremium: true,
    rating: 4,
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    bedrooms: 1,
    goods: [
      'Heating'
    ],
    host: {
      name: 'Maria Conner',
      avatarUrl: 'https://url-to-image/image.png',
      isPro: true
    },
    images: [
      'https://url-to-image/image.png'
    ],
    maxAdults: 1
  },

};
