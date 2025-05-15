import { reviewsSlice, resetIsSubmittingFailed } from './reviews-slice';
import { makeFakeComment } from '../../utils-mocks/mocks';
import { fetchReviewsAction, postReviewAction } from '../api-actions';

describe ('ReviewsSlice', ()=> {
  it ('should return initial state with empty action', ()=> {
    const emptyAction = {type: ''};
    const expectedState = {
      isSubmitting:false,
      isSubmittingFailed: false,
      isReviewsLoading: true,
      reviews: [],
      isReviewsFetchingError: false
    };

    const result = reviewsSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);

  });

  it ('should return default initial state with empty action and undefined state', ()=> {
    const emptyAction = {type: ''};
    const expectedState = {
      isSubmitting:false,
      isSubmittingFailed: false,
      isReviewsLoading: true,
      reviews: [],
      isReviewsFetchingError: false
    };

    const result = reviewsSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set isSubmittingFailed" to false with "resetIsSubmittingFailed" action', ()=> {

    const initialState = {
      isSubmitting:false,
      isSubmittingFailed: true,
      isReviewsLoading: true,
      reviews: [],
      isReviewsFetchingError: false
    };

    const expectedState = {
      isSubmitting:false,
      isSubmittingFailed: false,
      isReviewsLoading: true,
      reviews: [],
      isReviewsFetchingError: false
    };

    const result = reviewsSlice.reducer(initialState, resetIsSubmittingFailed);

    expect(result).toEqual(expectedState);
  });

  it(`should set "isReviewsLoading" to "true",
       with "fetchReviewsAction.pending"`,

  ()=> {
    const expectedState = {
      isSubmitting:false,
      isSubmittingFailed: false,
      isReviewsLoading: true,
      reviews: [],
      isReviewsFetchingError: false
    };

    const result = reviewsSlice.reducer(undefined, fetchReviewsAction.pending);

    expect(result).toEqual(expectedState);
  });

  it(`should set "reviews" to array with Review,
   "isReviewsLoading" to "false",
   with "fetchReviewsAction.fulfilled"`,

  ()=> {

    const comment = makeFakeComment();

    const expectedState = {
      isSubmitting:false,
      isSubmittingFailed: false,
      isReviewsLoading: false,
      reviews: [comment],
      isReviewsFetchingError: false
    };

    const action = fetchReviewsAction.fulfilled(
      [comment],
      '',
      comment.id,
    );

    const result = reviewsSlice.reducer(undefined, action);

    expect(result).toEqual(expectedState);
  });

  it(`should set "isReviewsLoading" to "false",
    "isReviewsFetchingError" to "true"
    with "fetchReviewsAction.rejected"`,

  ()=> {
    const expectedState = {
      isSubmitting:false,
      isSubmittingFailed: false,
      isReviewsLoading: false,
      reviews: [],
      isReviewsFetchingError: true
    };

    const result = reviewsSlice.reducer(undefined, fetchReviewsAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it(`should set "isSubmitting" to "true"
    with "postReviewAction.pending"`,

  ()=> {
    const expectedState = {
      isSubmitting:true,
      isSubmittingFailed: false,
      isReviewsLoading: true,
      reviews: [],
      isReviewsFetchingError: false
    };

    const result = reviewsSlice.reducer(undefined, postReviewAction.pending);

    expect(result).toEqual(expectedState);
  });

  it(`should set "isSubmitting" to "false",
    add Review in array of reviews,
    with "postReviewAction.fulfilled"`,

  ()=> {
    const comment = makeFakeComment();
    const userCommentData = {
      offerId: '1',
      reviewData: {
        comment: 'проверка',
        rating: 5,
      }
    };

    const expectedState = {
      isSubmitting:false,
      isSubmittingFailed: false,
      isReviewsLoading: true,
      reviews: [comment],
      isReviewsFetchingError: false
    };

    const action = postReviewAction.fulfilled(
      comment,
      '',
      userCommentData,
    );


    const result = reviewsSlice.reducer(undefined, action);

    expect(result).toEqual(expectedState);
  });

  it(`should set "isSubmitting" to "false",
    "isSubmittingFailed" to true
    with "postReviewAction.rejected"`,

  ()=> {
    const expectedState = {
      isSubmitting:false,
      isSubmittingFailed: true,
      isReviewsLoading: true,
      reviews: [],
      isReviewsFetchingError: false
    };

    const result = reviewsSlice.reducer(undefined, postReviewAction.rejected);

    expect(result).toEqual(expectedState);
  });


});

