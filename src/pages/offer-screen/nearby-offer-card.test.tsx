import {render, screen } from '@testing-library/react';
import NearbyOfferCard from './nearby-offer-card';
import { vi } from 'vitest';
import { Offer } from '../../types/offer';
import {makeFakeOffer, makeFakeStore } from '../../utils-mocks/mocks';
import { withHistory, withStore } from '../../utils-mocks/mock-component';
import userEvent from '@testing-library/user-event';
import { addToFavorites } from '../../store/api-actions';

vi.mock('../main-screen/rental-offer-card', () => ({
  default: ({ offer, onOfferFavoriteClick }: { offer: Offer; onOfferFavoriteClick: () => void }) => (
    <div data-testid="rental-offer-card" onClick={onOfferFavoriteClick}>
      {offer.id}
    </div>
  ),
}));

describe ('NearbyOfferCard', ()=> {

  it ('should render correctly', () => {
    const fakeNeighboringOffer = makeFakeOffer();
    const testId = 'rental-offer-card';

    const withHistoryComponent = withHistory(<NearbyOfferCard neighboringOffer = {fakeNeighboringOffer} />);

    const {withStoreComponent} = withStore(
      withHistoryComponent,
      makeFakeStore());

    render(withStoreComponent);
    const card = screen.getByTestId(testId);

    expect(card).toBeInTheDocument();
    expect(screen.getByText(fakeNeighboringOffer.id)).toBeInTheDocument();
  });

  it('should dispatch "addToFavorites" if neighboringOffer is not favorite', async () => {
    const fakeNeighboringOffer = { ...makeFakeOffer(), isFavorite: false, id: 'test-id' };

    const withHistoryComponent = withHistory(
      <NearbyOfferCard neighboringOffer={fakeNeighboringOffer} />
    );

    const { withStoreComponent, mockStore } = withStore(withHistoryComponent, makeFakeStore());

    render(withStoreComponent);

    await userEvent.click(screen.getByTestId('rental-offer-card'));

    const actions = mockStore.getActions();
    expect(actions.some((action) => action.type === addToFavorites.pending.type)).toBe(true);
  });

});
