import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import ReviewForm from './review-form';
import ReviewItem from './review-item';
import { fetchReviews } from '../../store/action';
import { DetailedOffer } from '../../types/offer';

type ReviewsListProps = {
  offerId: DetailedOffer['id'];
};

function ReviewsList({offerId}: ReviewsListProps): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(()=> {
    dispatch(fetchReviews(offerId));
  }, [offerId, dispatch]);

  const reviews = useAppSelector((state)=> state.reviews);
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot;{' '}
        <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </ul>

      <ReviewForm />
    </section>
  );
}

export default ReviewsList;
