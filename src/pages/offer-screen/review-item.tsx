import { Review } from '../../types/review';
import { prepareReviewData } from '../../utils/utils';

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

export default ReviewItem;
