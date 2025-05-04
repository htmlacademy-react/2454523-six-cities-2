import { render, screen} from '@testing-library/react';
import { withStore, withHistory } from '../../utilsMocks/mock-component';
import { makeFakeComment, makeFakeDetailedOffer, makeFakeOffer, makeFakeStore } from '../../utilsMocks/mocks';
import OfferScreen from './offer-screen';

describe('OfferScreen', () => {

  const detailedOffer = makeFakeDetailedOffer();
  const review = makeFakeComment();

  it('should render correctly', () => {

    const withHistoryComponent = withHistory(<OfferScreen/>);


    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
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
      }));


    render(withStoreComponent);

    expect(screen.getByText(detailedOffer.description)).toBeInTheDocument();
    expect(screen.getByText(`€${detailedOffer.price}`)).toBeInTheDocument();
    detailedOffer.goods.forEach((good) => {
      expect(
        screen.getByText(good)
      ).toBeInTheDocument();
    });
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(review.comment)).toBeInTheDocument();
  });

  it('should show Premium badge when isPremium is true', () => {
    const premiumOffer = {
      ...detailedOffer,
      isPremium: true
    };

    const withHistoryComponent = withHistory(<OfferScreen/>);

    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        DETAILED_OFFER: {
          neighboringOffers:[makeFakeOffer()],
          detailedOffer: premiumOffer,
          isDetailedOfferLoading: false,
          isDetailedOfferFetchingError: false
        }
      }));


    render(withStoreComponent);

    expect(screen.getByTestId('offer-premium-badge')).toBeInTheDocument();

  });


  it('should not show Premium badge when isPremium is false', () => {
    const notPremiumOffer = {
      ...detailedOffer,
      isPremium: false
    };

    const withHistoryComponent = withHistory(<OfferScreen/>);

    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        DETAILED_OFFER: {
          neighboringOffers:[makeFakeOffer()],
          detailedOffer: notPremiumOffer,
          isDetailedOfferLoading: false,
          isDetailedOfferFetchingError: false
        },
      }));

    render(withStoreComponent);

    expect(screen.queryByTestId('offer-premium-badge')).not.toBeInTheDocument();

  });


  it('should render correct number of gallery images', () => {
    const { withStoreComponent } = withStore(
      withHistory(<OfferScreen />),
      makeFakeStore({
        DETAILED_OFFER: {
          detailedOffer,
          neighboringOffers: [makeFakeOffer()],
          isDetailedOfferLoading: false,
          isDetailedOfferFetchingError: false
        },
      })
    );

    render(withStoreComponent);

    const imgs = screen.getAllByAltText('Photo studio');
    expect(imgs).toHaveLength(detailedOffer.images.length);
  });

});
