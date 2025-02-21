import { Offers } from '../../types/offer';
import NearbyOfferCard from './nearby-offer-card';

type NearbyOffersListProps = {
  neighboringOffers: Offers;
}

function NearbyOffersList ({neighboringOffers}: NearbyOffersListProps) : JSX.Element {
  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <div className="near-places__list places__list">
          {neighboringOffers.map((neighboringOffer)=> (
            <NearbyOfferCard
              key = {neighboringOffer.id}
              neighboringOffer = {neighboringOffer}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default NearbyOffersList;
