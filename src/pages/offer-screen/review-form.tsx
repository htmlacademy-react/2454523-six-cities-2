import React from 'react';
import { useState, ChangeEvent } from 'react';
import { STARS_RAITING, MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH } from '../../const';
import { postReviewAction } from '../../store/api-actions';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setIsSubmittingFailed } from '../../store/action';

function ReviewForm () {

  const {offerId} = useParams();
  const dispatch = useAppDispatch();
  const isSubmitting = useAppSelector((state)=> state.isSubmitting);
  const isSubmittingFailed = useAppSelector((state)=> state.isSubmittingFailed);

  const [starsRating, setStarsRating] = useState('');

  const handleRatingStarsChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    const value = target.value;
    setStarsRating(value);
  };

  const [reviewsText, setReviewsText] = useState('');

  const handleReviewText = ({target}: ChangeEvent<HTMLTextAreaElement>) => {
    const value = target.value;
    setReviewsText(value);
  };

  const isValid = reviewsText.length >= MIN_COMMENT_LENGTH &&
  reviewsText.length <= MAX_COMMENT_LENGTH &&
  starsRating !== '';

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>)=> {
    evt.preventDefault();

    if (!offerId) {
      return null;
    }

    if (isSubmittingFailed) {
      dispatch(setIsSubmittingFailed(false));
    }

    dispatch(postReviewAction({
      offerId,
      reviewData: {
        comment: reviewsText,
        rating: Number(starsRating),
      }
    }));
    setReviewsText('');
    setStarsRating('');
  };

  return (
    <form
      className="reviews__form form"
      action="#" method="post"
      onSubmit={handleSubmit}
    >
      <fieldset disabled={isSubmitting} style={{border: 'none', padding: 0}}>
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">

          {STARS_RAITING.map((starRaiting, index, array) => {
            const value = (array.length - index).toString();
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
                />
                <label
                  htmlFor={`${value}-stars`}
                  className="reviews__rating-label form__rating-label"
                  title={starRaiting}
                >
                  <svg className="form__star-image" width="37" height="33">
                    <use xlinkHref="#icon-star"></use>
                  </svg>
                </label>
              </React.Fragment>
            );
          })}

        </div>
        <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" onChange={handleReviewText} value={reviewsText}></textarea>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
                      To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          {isSubmittingFailed && <p style={{color: 'red'}}>Отправка не удалась. Повторите еще раз!</p>}
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

