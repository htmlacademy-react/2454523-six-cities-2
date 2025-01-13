import { useState } from 'react';
import { Offers } from '../../types/offer';
import RentalOfferCard from './rental-offer-card';

type OffersListProps = {
  offers: Offers;
}

function OffersList (props : OffersListProps) : JSX.Element{
  const {offers} = props;

  const [activeOfferId, setActiveOfferId] = useState('');
  const handleMouseEnter = (id: string) => {
    // eslint-disable-next-line no-console
    console.log(activeOfferId);
    setActiveOfferId(id);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map ((offer) => (
        <RentalOfferCard offer = {offer}
          key = {offer.id}
          onMouseEnter={() => handleMouseEnter(offer.id)}
        />
      ))}
    </div>

  );
}

export default OffersList;
