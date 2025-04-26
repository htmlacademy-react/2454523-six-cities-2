import { render, screen} from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute, AuthorizationStatus, SortType } from '../../const';
import App from './app';
import { withStore, withHistory } from '../../utilsMocks/mock-component';
import { makeFakeComment, makeFakeDetailedOffer, makeFakeOffer } from '../../utilsMocks/mocks';


describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render MainScreen when user navigate to "/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);

    const offer = makeFakeOffer();

    const { withStoreComponent } = withStore(
      withHistoryComponent,
      {
        OFFERS: {
          isOffersDataLoading: false,
          offers: [offer],
          isOffersFetchingError: false,
        },
        FILTERS: {
          city: offer.city.name,
          sortType: SortType.Popular,
        },
        USER: {
          authorizationStatus: AuthorizationStatus.Auth,
          userEmail: 'test'
        },
        FAVORITES: {
          isFavoritesFetchingError: false,
          isFavoritesLoading: true,
          favorites: []
        }
      }
    );


    render(withStoreComponent);

    expect(screen.getByText(new RegExp(offer.title, 'i'))).toBeInTheDocument();
    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${offer.price}`))).toBeInTheDocument();
    expect(screen.getByText(/Paris/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${offer.type}`))).toBeInTheDocument();

  });


  it('should render FavoriteScreen when user navigate to "/favorites"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);

    const favoriteOffer = makeFakeOffer();

    const { withStoreComponent } = withStore(
      withHistoryComponent,
      {
        OFFERS: {
          isOffersDataLoading: false,
          offers: [favoriteOffer],
          isOffersFetchingError: false,
        },
        USER: {
          authorizationStatus: AuthorizationStatus.Auth,
          userEmail: 'test'
        },
        FAVORITES: {
          isFavoritesFetchingError: false,
          isFavoritesLoading: false,
          favorites: [favoriteOffer]
        }
      }
    );
    mockHistory.push(AppRoute.Favorites);

    render(withStoreComponent);

    expect(screen.getByText(new RegExp(favoriteOffer.title, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${favoriteOffer.price}`))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${favoriteOffer.type}`))).toBeInTheDocument();
    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });


  it('should render LoginScreen when user navigate to "/login"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);

    const offer = makeFakeOffer();

    const { withStoreComponent } = withStore(
      withHistoryComponent,
      {
        OFFERS: {
          isOffersDataLoading: false,
          offers: [offer],
          isOffersFetchingError: false,
        },
        USER: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userEmail: ''
        },
      }
    );

    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);

    expect(
      screen.getByRole('heading', { level: 1, name: /Sign in/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Sign in/i })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toHaveAttribute('type', 'email');
    expect(screen.getByPlaceholderText(/password/i)).toHaveAttribute('type', 'password');
  });


  it('should render OfferScreen when user navigate to "/offer/:offerId"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);

    const offer = makeFakeOffer();
    const detailedOffer = makeFakeDetailedOffer();
    const review = makeFakeComment();

    const { withStoreComponent } = withStore(
      withHistoryComponent,
      {
        OFFERS: {
          isOffersDataLoading: false,
          offers: [offer],
          isOffersFetchingError: false,
        },
        USER: {
          authorizationStatus: AuthorizationStatus.Auth,
          userEmail: 'test'
        },
        FAVORITES: {
          isFavoritesFetchingError: false,
          isFavoritesLoading: true,
          favorites: []
        },
        DETAILED_OFFER: {
          neighboringOffers:[makeFakeOffer()],
          detailedOffer: detailedOffer,
          isDetailedOfferLoading: false,
          isDetailedOfferFetchingError: false
        },
        REVIEWS: {
          isSubmitting:false,
          isSubmittingFailed: false,
          isReviewsLoading: false,
          reviews: [review],
          isReviewsFetchingError: false
        }
      }
    );

    mockHistory.push(`${AppRoute.Offer}/${offer.id}`);

    render(withStoreComponent);

    expect(screen.getByText(new RegExp(detailedOffer.title, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${detailedOffer.price}`))).toBeInTheDocument();

    detailedOffer.goods.forEach((good) => {
      expect(
        screen.getByText(new RegExp(good, 'i'))
      ).toBeInTheDocument();
    });
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(review.comment, 'i'))).toBeInTheDocument();

  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const unknownRoute = '/unknown-route';

    const offer = makeFakeOffer();

    const { withStoreComponent } = withStore(
      withHistoryComponent,
      {
        OFFERS: {
          isOffersDataLoading: false,
          offers: [offer],
          isOffersFetchingError: false,
        },
        USER: {
          authorizationStatus: AuthorizationStatus.Auth,
          userEmail: 'test'
        },
        FAVORITES: {
          isFavoritesFetchingError: false,
          isFavoritesLoading: true,
          favorites: []
        }
      }
    );

    mockHistory.push(unknownRoute);

    render(withStoreComponent);

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();

  });
});
