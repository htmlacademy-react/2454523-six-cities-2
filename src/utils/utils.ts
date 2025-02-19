import {Review} from '../types/review';

const prepareReviewData = (review: Review) => {
  const reviewDate = new Date(review.date);

  return {
    keyValue: `${review.id}`,
    formattedDate: reviewDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    }),
    dateTimeValue: reviewDate.toISOString().split('T')[0],
  };
};

export {prepareReviewData};
