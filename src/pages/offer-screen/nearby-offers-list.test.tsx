import {render, screen } from '@testing-library/react';
import NearbyOffersList from './nearby-offers-list';
import { makeFakeOffer } from '../../utilsMocks/mocks';
import { vi } from 'vitest';
import { NearbyOfferCardProps } from './nearby-offer-card';

vi.mock('./nearby-offer-card', () => ({
  default: ({neighboringOffer}: NearbyOfferCardProps) => (
    <div data-testid="nearby-offer-card">{neighboringOffer.id}</div>
  ),
}));

describe ('Component: NearbyOffersList', ()=> {
  it ('should render correct', () => {
    const expectedHeaderText = /Other places in the neighbourhood/i;
    const expectedCount = 2;
    const testId = 'nearby-offer-card';
    const neighboringOffers = [makeFakeOffer(), makeFakeOffer()];

    render(<NearbyOffersList neighboringOffers = {neighboringOffers} />);
    const cards = screen.getAllByTestId(testId);

    expect(screen.getByText(expectedHeaderText)).toBeInTheDocument();
    expect(cards).toHaveLength(expectedCount);
  });
});
