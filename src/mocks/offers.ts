import { Offers, DetailedOffers } from '../types/offer';
import { AVATAR_URL } from '../const';


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
          latitude: 52.3909553943508,
          longitude: 4.85309666406198,
          zoom: 10
        }
      },
      location: {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
        zoom: 10
      },
      isFavorite: false,
      isPremium: false,
      rating: 2,
      previewImage: `${AVATAR_URL}?rnd=${Math.random()}`
    },
    {
      id: '2',
      title: 'Beautiful & luxurious studio at great location2',
      type: 'apartment',
      price: 150,
      city: {
        name: 'Amsterdam',
        location: {
          latitude: 52.3609553943508,
          longitude: 4.85309666406198,
          zoom: 12
        }
      },
      location: {
        latitude: 52.3609553943508,
        longitude: 4.85309666406198,
        zoom: 12
      },
      isFavorite: true,
      isPremium: false,
      rating: 5,
      previewImage: `${AVATAR_URL}?rnd=${Math.random()}`
    },
    {
      id: '3',
      title: 'Beautiful & luxurious studio at great location3',
      type: 'house',
      price: 180,
      city: {
        name: 'Amsterdam',
        location: {
          latitude: 52.3909553943508,
          longitude: 4.929309666406198,
          zoom: 10
        }
      },
      location: {
        latitude: 52.3909553943508,
        longitude: 4.929309666406198,
        zoom: 10
      },
      isFavorite: true,
      isPremium: true,
      rating: 3,
      previewImage: `${AVATAR_URL}?rnd=${Math.random()}`
    },
    {
      id: '4',
      title: 'Beautiful & luxurious studio at great location4',
      type: 'apartment',
      price: 200,
      city: {
        name: 'Amsterdam',
        location: {
          latitude: 52.3809553943508,
          longitude: 4.939309666406198,
          zoom: 12
        }
      },
      location: {
        latitude: 52.3809553943508,
        longitude: 4.939309666406198,
        zoom: 12
      },
      isFavorite: false,
      isPremium: true,
      rating: 4,
      previewImage: `${AVATAR_URL}?rnd=${Math.random()}`
    },
    {
      id: '5',
      title: 'Beautiful & luxurious studio at great location5',
      type: 'apartment',
      price: 1200,
      city: {
        name: 'Paris',
        location: {
          latitude: 48.8566,
          longitude: 2.3522,
          zoom: 10
        }
      },
      location: {
        latitude: 48.8566,
        longitude: 2.3522,
        zoom: 10
      },
      isFavorite: false,
      isPremium: false,
      rating: 2,
      previewImage: `${AVATAR_URL}?rnd=${Math.random()}`
    },
  ];

export const detailedOffers: DetailedOffers = [
  {
    id: '1',
    title: 'Beautiful & luxurious studio at great location',
    type: 'apartment',
    price: 120,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
        zoom: 8
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 8
    },
    isFavorite: false,
    isPremium: true,
    rating: 4,
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    bedrooms: 2,
    goods: [
      'Heating', 'Kitchen', 'Wi-Fi', 'Coffee machine',
      'Towels', 'Baby seat', 'Cabel TV', 'Dishwasher'
    ],
    host: {
      name: 'Oliver Conner',
      avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
      isPro: false
    },
    images: [
      `${AVATAR_URL}?rnd=${Math.random()}`,
      `${AVATAR_URL}?rnd=${Math.random()}`,
      `${AVATAR_URL}?rnd=${Math.random()}`,
      `${AVATAR_URL}?rnd=${Math.random()}`,
      `${AVATAR_URL}?rnd=${Math.random()}`,
      `${AVATAR_URL}?rnd=${Math.random()}`
    ],
    maxAdults: 5
  },
  {
    id: '2',
    title: 'Beautiful & luxurious studio at great location2',
    type: 'apartment',
    price: 150,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3609553943508,
        longitude: 4.85309666406198,
        zoom: 7
      }
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 7
    },
    isFavorite: true,
    isPremium: false,
    rating: 5,
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    bedrooms: 4,
    goods: [
      'Heating', 'Washing machine', 'Towels'
    ],
    host: {
      name: 'Jhone',
      avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
      isPro: true
    },
    images: [
      `${AVATAR_URL}?rnd=${Math.random()}`
    ],
    maxAdults: 3
  },
  {
    id: '3',
    title: 'Beautiful & luxurious studio at great location3',
    type: 'house',
    price: 180,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3909553943508,
        longitude: 4.929309666406198,
        zoom: 8
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
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
      avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
      isPro: false
    },
    images: [
      `${AVATAR_URL}?rnd=${Math.random()}`
    ],
    maxAdults: 2
  },
  {
    id: '4',
    title: 'Beautiful & luxurious studio at great location4',
    type: 'apartment',
    price: 200,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3809553943508,
        longitude: 4.939309666406198,
        zoom: 9
      }
    },
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
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
      avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
      isPro: true
    },
    images: [
      `${AVATAR_URL}?rnd=${Math.random()}`
    ],
    maxAdults: 1
  },
  {
    id: '5',
    title: 'Beautiful & luxurious studio at great location5',
    type: 'apartment',
    price: 1200,
    city: {
      name: 'Paris',
      location: {
        latitude: 48.8566,
        longitude: 2.3522,
        zoom: 9
      }
    },
    location: {
      latitude: 48.8566,
      longitude: 2.3522,
      zoom: 9
    },
    isFavorite: false,
    isPremium: true,
    rating: 4,
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Paris.',
    bedrooms: 1,
    goods: [
      'Heating'
    ],
    host: {
      name: 'Maria Conner',
      avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
      isPro: true
    },
    images: [
      `${AVATAR_URL}?rnd=${Math.random()}`
    ],
    maxAdults: 1
  },
];
