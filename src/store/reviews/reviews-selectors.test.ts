import { NameSpace } from '../../const';
import { makeFakeComment } from '../../utilsMocks/mocks';
import { getReviews, getIsReviewsLoading, getIsSubmitting, getIsSubmittingFailed, getIsReviewsFetchingError } from './reviews-selectors';

describe('Reviews Selectors', ()=> {

  const fakeReview = makeFakeComment();

  const state = {
    [NameSpace.Reviews]: {
      reviews: [fakeReview],
      isSubmitting:true,
      isSubmittingFailed: false,
      isReviewsLoading: true,
      isReviewsFetchingError: false
    }
  };

  it('should return reviews from State', ()=> {
    const {reviews} = state[NameSpace.Reviews];
    const result = getReviews(state);
    expect(result).toEqual(reviews);
  });

  it('should return Submitting status from State', ()=> {
    const {isSubmitting} = state[NameSpace.Reviews];
    const result = getIsSubmitting(state);
    expect(result).toBe(isSubmitting);
  });


  it('should return SubmittingFailed status from State', ()=> {
    const {isSubmittingFailed} = state[NameSpace.Reviews];
    const result = getIsSubmittingFailed(state);
    expect(result).toBe(isSubmittingFailed);
  });

  it('should return ReviewsLoading status from State', ()=> {
    const {isReviewsLoading} = state[NameSpace.Reviews];
    const result = getIsReviewsLoading(state);
    expect(result).toBe(isReviewsLoading);
  });

  it('should return ReviewsFetchingError status from State', ()=> {
    const {isReviewsFetchingError} = state[NameSpace.Reviews];
    const result = getIsReviewsFetchingError(state);
    expect(result).toBe(isReviewsFetchingError);
  });

});
