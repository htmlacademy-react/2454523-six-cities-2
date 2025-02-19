import Header from '../../components/header/header';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Offers } from '../../types/offer';

type FavoriteScreenPropos = {
  offers: Offers;
}

function FavoriteScreen ({offers} : FavoriteScreenPropos) : JSX.Element {


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

              {offers.map((offer)=> (
                <li key = {offer.id} className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <Link className="locations__item-link" to="/">
                        <span>{offer.city.name}</span>
                      </Link>
                    </div>
                  </div>
                  <div className="favorites__places">
                    <article className="favorites__card place-card">
                      {offer.isPremium && (
                        <div className="place-card__mark">
                          <span>Premium</span>
                        </div>
                      )}

                      <div className="favorites__image-wrapper place-card__image-wrapper">
                        <Link to={`/offer/${offer.id}`}>
                          <img className="place-card__image" src={offer.previewImage} width={150} height={110} alt={`${offer.city.name}-image`} />
                        </Link>
                      </div>
                      <div className="favorites__card-info place-card__info">
                        <div className="place-card__price-wrapper">
                          <div className="place-card__price">
                            <b className="place-card__price-value">&euro;{offer.price}</b>
                            <span className="place-card__price-text">&#47;&nbsp;night</span>
                          </div>
                          <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
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
                                width: `${offer.rating * 20}%`
                              }}
                            >
                            </span>
                            <span className="visually-hidden">Rating</span>
                          </div>
                        </div>
                        <h2 className="place-card__name">
                          <Link to="/">{offer.title}</Link>
                        </h2>
                        <p className="place-card__type">{offer.type}</p>
                      </div>
                    </article>
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
