import {render, screen } from '@testing-library/react';
import NearbyOfferCard from './nearby-offer-card';
import { vi } from 'vitest';
import { Offer } from '../../types/offer';
import { makeFakeOffer } from '../../utilsMocks/mocks';

vi.mock('../main-screen/rental-offer-card', () => ({
  default: ({ offer }: { offer: Offer }) => (
    <div data-testid="rental-offer-card">{offer.id}</div>
  ),
}));

describe ('Component: NearbyOfferCard', ()=> {
  it ('should render correct', () => {
    const fakeNeighboringOffer = makeFakeOffer();
    const testId = 'rental-offer-card';

    render(<NearbyOfferCard neighboringOffer = {fakeNeighboringOffer} />);
    const card = screen.getByTestId(testId);

    expect(card).toBeInTheDocument();
    expect(screen.getByText(fakeNeighboringOffer.id)).toBeInTheDocument();
  });
});
