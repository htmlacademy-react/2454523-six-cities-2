import React from 'react';
import { useState, ChangeEvent } from 'react';
import { STARS_RATING, MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH } from '../../const';
import { postReviewAction } from '../../store/api-actions';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsSubmitting, getIsSubmittingFailed } from '../../store/reviews/reviews-selectors';
import { resetIsSubmittingFailed } from '../../store/reviews/reviews-slice';

function ReviewForm () {

  const {offerId} = useParams();
  const dispatch = useAppDispatch();
  const isSubmitting = useAppSelector(getIsSubmitting);
  const isSubmittingFailed = useAppSelector(getIsSubmittingFailed);

  const [starsRating, setStarsRating] = useState(0);

  const handleRatingStarsChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    const value = target.value;
    setStarsRating(Number(value));
  };

  const [reviewsText, setReviewsText] = useState('');

  const handleReviewTextChange = ({target}: ChangeEvent<HTMLTextAreaElement>) => {
    const value = target.value;
    setReviewsText(value);
  };

  const isValid = reviewsText.length >= MIN_COMMENT_LENGTH &&
  reviewsText.length <= MAX_COMMENT_LENGTH &&
  starsRating !== 0;

  const handleFormSubmit = (evt: React.FormEvent<HTMLFormElement>)=> {
    evt.preventDefault();

    if (!offerId) {
      return null;
    }

    if (isSubmittingFailed) {
      dispatch(resetIsSubmittingFailed());
    }

    dispatch(postReviewAction({
      offerId,
      reviewData: {
        comment: reviewsText,
        rating: starsRating,
      }
    }));
    setReviewsText('');
    setStarsRating(0);
  };

  return (
    <form
      className="reviews__form form"
      action="#" method="post"
      onSubmit = {handleFormSubmit}
    >
      <fieldset disabled={isSubmitting} style={{border: 'none', padding: 0}}>
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">

          {STARS_RATING.map((starRating, index, array) => {
            const value = array.length - index;
            return (
              <React.Fragment key={value}>
                <input
                  className="form__rating-input visually-hidden"
                  name="rating"
                  value={value}
                  id={`${value}-stars`}
                  type="radio"
                  checked={starsRating === value}
                  onChange={handleRatingStarsChange}
                  data-testid= 'starsElement'
                />
                <label
                  htmlFor={`${value}-stars`}
                  className="reviews__rating-label form__rating-label"
                  title={starRating}
                >
                  <svg className="form__star-image" width="37" height="33">
                    <use xlinkHref="#icon-star"></use>
                  </svg>
                </label>
              </React.Fragment>
            );
          })}

        </div>
        <textarea
          className="reviews__textarea form__textarea"
          id="review"
          name="review"
          placeholder="Tell how was your stay, what you like and what can be improved"
          onChange={handleReviewTextChange}
          value={reviewsText}
          data-testid = 'reviewsTextElement'
        >
        </textarea>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
                      To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          {isSubmittingFailed && <p className='error-submit'>Отправка не удалась. Повторите еще раз!</p>}
          <button className="reviews__submit form__submit button"
            type="submit"
            disabled={!isValid}
          >
            Submit
          </button>
        </div>
      </fieldset>
    </form>
  );
}
export default ReviewForm;

