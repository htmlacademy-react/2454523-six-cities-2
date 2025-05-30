import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';

type OfferCardProps ={
  block: string;
  offer: Offer;
  onOfferMouseEnter?: () => void;
  onOfferMouseLeave?: () => void;
  onOfferFavoriteClick?: ()=> void;
}

function RentalOfferCard (props: OfferCardProps) {

  const {block, offer, onOfferMouseEnter, onOfferMouseLeave, onOfferFavoriteClick} = props;
  const {title, type, price, isPremium, previewImage, rating, isFavorite} = offer;

  return (
    <article className={`${block}__card place-card`}
      onMouseEnter = {onOfferMouseEnter}
      onMouseLeave = {onOfferMouseLeave}
      data-testid = {`rental-card-${offer.id}`}
    >

      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}

      <div className={`${block}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${offer.id}`}>
          <img className="place-card__image" src={previewImage} width={260} height={200} alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

          <button className={`place-card__bookmark-button
          ${isFavorite ? 'place-card__bookmark-button--active' : ''}
          button`}
          type="button"
          onClick={onOfferFavoriteClick}
          data-testid = "favoriteButton"
          >
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>

        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span
              style= {{
                width: `${rating * 20}%`
              }}
            >
            </span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default RentalOfferCard;
