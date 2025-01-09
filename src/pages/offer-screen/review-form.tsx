import React from 'react';
import { useState, ChangeEvent } from 'react';
import { STARS_RAITING } from '../../const';


function ReviewForm () {

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

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">

        {STARS_RAITING.map((starRaiting, index, array) => {
          const value = (array.length - index).toString();
          return (
            <React.Fragment key={value}>
              <input
                key={`${value}-input`}
                className="form__rating-input visually-hidden"
                name="rating"
                value={value}
                id={`${value}-stars`}
                type="radio"
                checked={starsRating === value}
                onChange={handleRatingStarsChange}
              />
              <label
                key={`${value}-label`}
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
        <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
      </div>
    </form>
  );
}
export default ReviewForm;

