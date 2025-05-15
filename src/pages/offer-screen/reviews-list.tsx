import { useAppSelector } from '../../hooks';
import ReviewForm from './review-form';
import ReviewItem from './review-item';
import { AuthorizationStatus, MAX_REVIEW_COUNT} from '../../const';
import { getReviews } from '../../store/reviews/reviews-selectors';
import { getAuthorizationStatus } from '../../store/user-process/user-process-selectors';


function ReviewsList(): JSX.Element {

  const reviews = useAppSelector(getReviews);
  const autorizationStatus = useAppSelector(getAuthorizationStatus);
  const reviewsForRendering = [...reviews]
    .sort((a,b)=> new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, MAX_REVIEW_COUNT);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot;{' '}
        <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviewsForRendering.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </ul>

      {autorizationStatus === AuthorizationStatus.Auth && <ReviewForm /> }
    </section>
  );
}

export default ReviewsList;
