import { createAction } from '@reduxjs/toolkit';
import { Offers } from '../types/offer';

export const changeCity = createAction('mainScreen/changeCity');
export const loadRentalOffers = createAction<{offers: Offers}>('mainScreen/loadRentalOffers');
