import Header from '../../components/header/header';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { fetchFavoritesOffersAction, removeFromFavorites } from '../../store/api-actions';
import FavoriteEmptyScreen from './favorite-empty-screen';
import { getFavorites } from '../../store/favorites/favorites-selectors';
import { groupFavoriteOffersByCity } from '../../utils/groupFavoriteOffers';


function FavoriteScreen () : JSX.Element {

  const dispatch = useAppDispatch();
  useEffect(()=> {
    dispatch(fetchFavoritesOffersAction());
  }, [dispatch]
  );

  const favorites = useAppSelector(getFavorites);

  if(favorites.length === 0){
    return (
      <FavoriteEmptyScreen/>
    );
  }


  const handleFavoriteRemoveClick = (offerId: string)=> {
    dispatch(removeFromFavorites({offerId}));
  };

  const groupedFavoriteOffers = groupFavoriteOffersByCity(favorites);

  const favoriteOffersForRender = Object.entries(groupedFavoriteOffers);

  return (
    <div className="page">
      <Helmet>
        <title>Six cities. Favorite places.</title>
      </Helmet>
      <Header/>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">

              {favoriteOffersForRender.map(([city, favoriteOffers])=> (
                <li key = {city} className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <Link className="locations__item-link" to="/">
                        <span>{city}</span>
                      </Link>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {favoriteOffers.map((favoriteOffer)=> (
                      <article key = {favoriteOffer.id} className="favorites__card place-card">
                        {favoriteOffer.isPremium && (
                          <div className="place-card__mark">
                            <span>Premium</span>
                          </div>
                        )}

                        <div className="favorites__image-wrapper place-card__image-wrapper">
                          <Link to={`/offer/${favoriteOffer.id}`}>
                            <img className="place-card__image" src={favoriteOffer.previewImage} width={150} height={110} alt={`${favoriteOffer.city.name}-image`} />
                          </Link>
                        </div>
                        <div className="favorites__card-info place-card__info">
                          <div className="place-card__price-wrapper">
                            <div className="place-card__price">
                              <b className="place-card__price-value">&euro;{favoriteOffer.price}</b>
                              <span className="place-card__price-text">&#47;&nbsp;night</span>
                            </div>

                            <button className="place-card__bookmark-button
                          place-card__bookmark-button--active button"
                            type="button"
                            onClick = {()=> handleFavoriteRemoveClick(favoriteOffer.id)}
                            >
                              <svg className="place-card__bookmark-icon" width={18} height={19}>
                                <use xlinkHref="#icon-bookmark"></use>
                              </svg>
                              <span className="visually-hidden">In bookmarks</span>
                            </button>

                          </div>
                          <div className="place-card__rating rating">
                            <div className="place-card__stars rating__stars">
                              <span
                                style= {{
                                  width: `${favoriteOffer.rating * 20}%`
                                }}
                              >
                              </span>
                              <span className="visually-hidden">Rating</span>
                            </div>
                          </div>
                          <h2 className="place-card__name">
                            <Link to="/">{favoriteOffer.title}</Link>
                          </h2>
                          <p className="place-card__type">{favoriteOffer.type}</p>
                        </div>
                      </article>
                    ))}

                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to="/">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width={64} height={33} />
        </Link>
      </footer>
    </div>
  );

}


export default FavoriteScreen;
