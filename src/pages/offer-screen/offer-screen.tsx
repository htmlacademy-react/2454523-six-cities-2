import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import ReviewsList from './reviews-list';
import Map from '../../components/map/map';
import NearbyOffersList from './nearby-offers-list';
import { getCityCoords } from '../../utils/utils';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { CITIES, СITIES_COORDS } from '../../const';
import { useEffect } from 'react';
import { dropOffer } from '../../store/detailed-offer/detailed-offer-slice';
import { fetchDetailedOfferAction, fetchReviewsAction } from '../../store/api-actions';
import { getDetailedOffer, getIsDetailedOfferLoading, getnNighboringOffers } from '../../store/detailed-offer/detailed-offer-selectors';


function OfferScreen () : JSX.Element {
  const {offerId} = useParams();

  const dispatch = useAppDispatch();
  const detailedOffer = useAppSelector(getDetailedOffer);
  const neighboringOffers = useAppSelector(getnNighboringOffers);
  const isDetailedOfferLoading = useAppSelector(getIsDetailedOfferLoading);


  useEffect(()=>{
    if(offerId){
      dispatch(fetchDetailedOfferAction(offerId));
      dispatch(fetchReviewsAction(offerId));
    }

    return ()=>{
      dispatch(dropOffer());
    };
  }, [offerId,dispatch]);

  if (isDetailedOfferLoading) {
    return <div>Loading...</div>;
  }

  if(!detailedOffer) {
    return <Navigate to = '*'/>;
  }

  const {id, title, type, price, isPremium, rating, description, bedrooms, goods, host, images, maxAdults} = detailedOffer;

  const cityCoords = getCityCoords(СITIES_COORDS, detailedOffer?.city.name ?? CITIES[0]);

  return (
    <div className="page">
      <Helmet>
        <title>Six cities. Offers.</title>
      </Helmet>
      <Header/>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images.map((image) => {
                const keyValue = `${id}-${image}`;
                return (
                  <div key = {keyValue} className="offer__image-wrapper">
                    <img className="offer__image" src={image} alt="Photo studio" />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {title}
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span
                    style= {{
                      width: `${rating * 20}%`
                    }}
                  >
                  </span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {goods.map((good)=> {
                    const keyValue = `${id}-${good}`;
                    return (
                      <li key={keyValue} className="offer__inside-item">
                        {good}
                      </li>);
                  })}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src="img/avatar-angelina.jpg" width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    {host.name}
                  </span>
                  {host.isPro && (
                    <span className="offer__user-status">
                    Pro
                    </span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {description}
                  </p>
                </div>
              </div>
              <ReviewsList/>
            </div>
          </div>
          <Map
            block = "cities"
            location = {cityCoords}
            offers = {neighboringOffers}
            currentOffer={detailedOffer}
          />
        </section>
        <NearbyOffersList neighboringOffers = {neighboringOffers} />

      </main>
    </div>

  );
}

export default OfferScreen;

