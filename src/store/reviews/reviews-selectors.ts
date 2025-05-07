import { createSelector } from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {State} from '../../types/state';
import { ReviewsState } from '../../types/state';


const getReviewsSlice = (state: Pick<State, NameSpace.Reviews>): ReviewsState => state[NameSpace.Reviews];

export const getReviews = createSelector(
  [getReviewsSlice],
  (state: ReviewsState) => state.reviews
);

export const getIsReviewsLoading = createSelector(
  [getReviewsSlice],
  (state: ReviewsState) => state.isReviewsLoading
);

export const getIsSubmitting = createSelector(
  [getReviewsSlice],
  (state: ReviewsState) => state.isSubmitting
);

export const getIsSubmittingFailed = createSelector(
  [getReviewsSlice],
  (state: ReviewsState) => state.isSubmittingFailed
);

export const getIsReviewsFetchingError = createSelector(
  [getReviewsSlice],
  (state: ReviewsState) => state.isReviewsFetchingError
);
