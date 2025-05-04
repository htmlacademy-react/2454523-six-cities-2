import { vi } from 'vitest';
import { render, screen} from '@testing-library/react';
import { withStore, withHistory } from '../../utilsMocks/mock-component';
import { makeFakeOffer, makeFakeStore } from '../../utilsMocks/mocks';
import RentalOfferCard from './rental-offer-card';
import userEvent from '@testing-library/user-event';


describe('RentalOfferCard', () => {
  const onMouseEnter = vi.fn();
  const onMouseLeave = vi.fn();
  const onClick = vi.fn();


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
    const withHistoryComponent = withHistory(<RentalOfferCard block = 'cities' offer = {offer} onClick={onClick}/>);


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

    expect(onClick).toHaveBeenCalledTimes(1);

  });

  it('should call onMouseEnter when mouse enters card', async () => {

    const offer = makeFakeOffer();
    const withHistoryComponent = withHistory(<RentalOfferCard block = 'cities' offer = {offer} onMouseEnter={onMouseEnter}/>);


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

    expect(onMouseEnter).toHaveBeenCalledTimes(1);

  });

  it('should call onMouseLeave when mouse leaves card', async () => {

    const offer = makeFakeOffer();
    const withHistoryComponent = withHistory(<RentalOfferCard block = 'cities' offer = {offer} onMouseLeave={onMouseLeave}/>);


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
    expect(onMouseLeave).toHaveBeenCalledTimes(1);

  });


});
