import { Reviews } from '../../types/review';
import ReviewForm from './review-form';


type ReviewsListProps = {
  reviews: Reviews;
}


function ReviewsList (props: ReviewsListProps) : JSX.Element {

  const {reviews} = props;
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map((review) => {
          const {user} = review;
          const keyValue = `${review.id}`;
          const reviewDate = new Date(review.date);
          const formattedDate = reviewDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
          });
          const dateTimeValue = reviewDate.toISOString().split('T')[0];
          return (
            <li key = {keyValue} className="reviews__item">
              <div className="reviews__user user">
                <div className="reviews__avatar-wrapper user__avatar-wrapper">
                  <img className="reviews__avatar user__avatar" src={user.avatarUrl} width={100} height={100} alt="Reviews avatar" />
                </div>
                <span className="reviews__user-name">
                  {user.name}
                </span>
              </div>
              <div className="reviews__info">
                <div className="reviews__rating rating">
                  <div className="reviews__stars rating__stars">
                    <span
                      style= {{
                        width: `${review.rating * 20}%`
                      }}
                    >
                    </span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                </div>
                <p className="reviews__text">
                  {review.comment}
                </p>
                <time className="reviews__time" dateTime={dateTimeValue}>{formattedDate}</time>
              </div>
            </li>
          );

        })}


      </ul>

      <ReviewForm/>

    </section>
  );
}

export default ReviewsList;
