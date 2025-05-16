import { vi } from 'vitest';
import { render, screen} from '@testing-library/react';
import { withStore, withHistory } from '../../utils-mocks/mock-component';
import { makeFakeOffer, makeFakeStore } from '../../utils-mocks/mocks';
import RentalOfferCard from './rental-offer-card';
import userEvent from '@testing-library/user-event';


describe('RentalOfferCard', () => {
  const handleOfferMouseEnter = vi.fn();
  const handleOfferMouseLeave = vi.fn();
  const handleOfferFavoriteClick = vi.fn();


  it('should render correctly', () => {

    const offer = makeFakeOffer();
    const withHistoryComponent = withHistory(<RentalOfferCard block = 'cities' offer = {offer}/>);


    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        OFFERS: {
          isOffersDataLoading: false,
          offers: [offer],
          isOffersFetchingError: false,
        }
      }));


    render(withStoreComponent);

    expect(screen.getByText(offer.title)).toBeInTheDocument();
    expect(screen.getByText(`€${offer.price}`)).toBeInTheDocument();
    expect(screen.getByText(offer.type)).toBeInTheDocument();
  });

  it('should show Premium badge when isPremium is true', () => {
    const offer = makeFakeOffer();
    const premiumOffer = {
      ...offer,
      isPremium: true
    };
    const expectedText = /Premium/i;

    const withHistoryComponent = withHistory(<RentalOfferCard block = 'cities' offer = {premiumOffer}/>);


    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        OFFERS: {
          isOffersDataLoading: false,
          offers: [premiumOffer],
          isOffersFetchingError: false,
        }
      }));


    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();

  });


  it('should not show Premium badge when isPremium is false', () => {
    const offer = makeFakeOffer();
    const notPremiumOffer = {
      ...offer,
      isPremium: false
    };

    const notExpectedText = /Premium/i;

    const withHistoryComponent = withHistory(<RentalOfferCard block = 'cities' offer = {notPremiumOffer}/>);


    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        OFFERS: {
          isOffersDataLoading: false,
          offers: [notPremiumOffer],
          isOffersFetchingError: false,
        }
      }));


    render(withStoreComponent);

    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();

  });

  it('should apply active class to bookmark button when isFavorite is true', () => {
    const offer = makeFakeOffer();
    const favoriteOffer = {
      ...offer,
      isFavorite: true
    };

    const withHistoryComponent = withHistory(<RentalOfferCard block = 'cities' offer = {favoriteOffer}/>);


    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        OFFERS: {
          isOffersDataLoading: false,
          offers: [favoriteOffer],
          isOffersFetchingError: false,
        }
      }));


    render(withStoreComponent);

    expect(screen.getByTestId('favoriteButton')).toHaveClass('place-card__bookmark-button--active');

  });


  it('should call onClick handler when bookmark button is clicked', async () => {

    const offer = makeFakeOffer();
    const withHistoryComponent = withHistory(<RentalOfferCard block = 'cities' offer = {offer} onOfferFavoriteClick={handleOfferFavoriteClick}/>);


    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        OFFERS: {
          isOffersDataLoading: false,
          offers: [offer],
          isOffersFetchingError: false,
        }
      }));


    render(withStoreComponent);

    await userEvent.click(screen.getByTestId('favoriteButton'));

    expect(handleOfferFavoriteClick).toHaveBeenCalledTimes(1);

  });

  it('should call onMouseEnter when mouse enters card', async () => {

    const offer = makeFakeOffer();
    const withHistoryComponent = withHistory(<RentalOfferCard block = 'cities' offer = {offer} onOfferMouseEnter={handleOfferMouseEnter}/>);


    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        OFFERS: {
          isOffersDataLoading: false,
          offers: [offer],
          isOffersFetchingError: false,
        }
      }));

    render(withStoreComponent);

    await userEvent.hover(screen.getByTestId(`rental-card-${offer.id}`));

    expect(handleOfferMouseEnter).toHaveBeenCalledTimes(1);

  });

  it('should call onMouseLeave when mouse leaves card', async () => {

    const offer = makeFakeOffer();
    const withHistoryComponent = withHistory(<RentalOfferCard block = 'cities' offer = {offer} onOfferMouseLeave={handleOfferMouseLeave}/>);


    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        OFFERS: {
          isOffersDataLoading: false,
          offers: [offer],
          isOffersFetchingError: false,
        }
      }));

    render(withStoreComponent);

    await userEvent.unhover(screen.getByTestId(`rental-card-${offer.id}`));
    expect(handleOfferMouseLeave).toHaveBeenCalledTimes(1);

  });


});
