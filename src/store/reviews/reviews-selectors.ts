import {NameSpace} from '../../const';
import { Reviews } from '../../types/review';
import {State} from '../../types/state';

export const getReviews = (state: State): Reviews => state[NameSpace.Reviews].reviews;
export const getIsReviewsLoading = (state: State): boolean => state[NameSpace.Reviews].isReviewsLoading;
export const getIsSubmitting = (state: State): boolean => state[NameSpace.Reviews].isSubmitting;
export const getIsSubmittingFailed = (state: State): boolean => state[NameSpace.Reviews].isSubmittingFailed;

