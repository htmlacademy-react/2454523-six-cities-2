import { address, datatype, lorem, name, image, date } from 'faker';
import { DetailedOffer, Offer } from '../types/offer';
import { Review } from '../types/review';
import { State } from '../types/state';
import { createAPI } from '../services/api';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;
export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export function makeFakeDetailedOffer(): DetailedOffer {
  const latitude = parseFloat(address.latitude());
  const longitude = parseFloat(address.longitude());
  const zoomLevel = 8;

  return {
    id: datatype.uuid(),
    title: lorem.sentence(),
    type: 'apartment',
    price: datatype.number({ min: 50, max: 500 }),
    city: {
      name: address.city(),
      location: { latitude, longitude, zoom: zoomLevel }
    },
    location: { latitude, longitude, zoom: zoomLevel },
    isFavorite: false,
    isPremium:  datatype.boolean(),
    rating:     datatype.number({ min: 1, max: 5 }),
    description: lorem.paragraph(),
    bedrooms:    datatype.number({ min: 1, max: 5 }),
    goods:['Heating', 'Kitchen', 'Wifi', 'Cable TV', 'Washing machine'],
    host: {
      name: `${name.firstName() } ${ name.lastName()}`,
      avatarUrl: image.avatar(),
      isPro: datatype.boolean()
    },
    images: Array.from(
      { length: datatype.number({ min: 1, max: 5 }) },
      () => image.imageUrl()
    ),
    maxAdults: datatype.number({ min: 1, max: 6 }),
  };
}

export function makeFakeOffer(): Offer {
  const latitude = parseFloat(address.latitude());
  const longitude = parseFloat(address.longitude());
  const zoomLevel = 8;

  return {
    id: datatype.uuid(),
    title: lorem.sentence(),
    type: 'apartment',
    price: datatype.number({ min: 50, max: 500 }),
    city: {
      name: address.city(),
      location: { latitude, longitude, zoom: zoomLevel }
    },
    location: { latitude, longitude, zoom: zoomLevel },
    isFavorite: datatype.boolean(),
    isPremium: datatype.boolean(),
    rating: datatype.number({ min: 1, max: 5 }),
    previewImage: image.imageUrl(),
  };
}

export function makeFakeComment(): Review {
  return {
    id: datatype.uuid(),
    date: date.past(2).toISOString(),
    user: {
      name: `${name.firstName()} ${name.lastName()}`,
      avatarUrl: image.avatar(),
      isPro: datatype.boolean(),
    },
    comment: lorem.paragraph(),
    rating: datatype.number({ min: 1, max: 5 }),
  };
}
