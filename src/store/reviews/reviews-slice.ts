import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { ReviewsState } from '../../types/state';
import { fetchReviewsAction, postReviewAction } from '../api-actions';

const initialState: ReviewsState = {
  isSubmitting:false,
  isSubmittingFailed: false,
  isReviewsLoading: true,
  reviews: [],
  isReviewsFetchingError: false
};

export const reviewsSlice = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {
    resetIsSubmittingFailed: (state) => {
      state.isSubmittingFailed = false;
    }
  },
  extraReducers (builder){
    builder
      .addCase(fetchReviewsAction.pending, (state)=> {
        state.isReviewsLoading = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action)=> {
        state.reviews = action.payload;
        state.isReviewsLoading = false;
      })
      .addCase(fetchReviewsAction.rejected, (state)=> {
        state.isReviewsLoading = false;
        state.isReviewsFetchingError = true;
      })
      .addCase(postReviewAction.pending, (state)=> {
        state.isSubmitting = true;
      })
      .addCase(postReviewAction.fulfilled, (state, action)=> {
        state.isSubmitting = false;
        state.reviews.push(action.payload);
      })
      .addCase(postReviewAction.rejected, (state)=> {
        state.isSubmittingFailed = true;
        state.isSubmitting = false;
      });
  }
});

export const {resetIsSubmittingFailed} = reviewsSlice.actions;
