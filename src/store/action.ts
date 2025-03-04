import { createAction } from '@reduxjs/toolkit';
import { Offers } from '../types/offer';

export const changeCity = createAction('mainScreen/changeCity', (city: string) => ({payload: city}));
export const loadRentalOffers = createAction('mainScreen/loadRentalOffers', (offers: Offers)=> ({payload: offers}));
