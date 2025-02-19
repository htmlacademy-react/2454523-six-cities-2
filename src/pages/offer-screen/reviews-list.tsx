import { Reviews, Review } from '../../types/review';
import ReviewForm from './review-form';
import { prepareReviewData } from '../../utils/utils';

type ReviewsListProps = {
  reviews: Reviews;
};

type ReviewItemProps = {
  review: Review;
};

function ReviewItem({ review }: ReviewItemProps): JSX.Element {
  const { user } = review;
  const { keyValue, formattedDate, dateTimeValue } = prepareReviewData(review);

  return (
    <li key={keyValue} className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={user.avatarUrl}
            width={100}
            height={100}
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span
              style={{
                width: `${review.rating * 20}%`,
              }}
            >
            </span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{review.comment}</p>
        <time className="reviews__time" dateTime={dateTimeValue}>
          {formattedDate}
        </time>
      </div>
    </li>
  );
}

function ReviewsList(props: ReviewsListProps): JSX.Element {
  const { reviews } = props;
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
