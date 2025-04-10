/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-console */
import { useState } from 'react';
import { Offers } from '../../types/offer';
import RentalOfferCard from './rental-offer-card';
import { memo } from 'react';
import { addToFavorites, removeFromFavorites } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks';
import { Offer } from '../../types/offer';

type OffersListProps = {
  offers: Offers;
  onOffersListHover: (offerId:string) => void;
}

function OffersList (props : OffersListProps) : JSX.Element{
  const dispatch = useAppDispatch();

  const {offers, onOffersListHover } = props;

  const [activeOfferId, setActiveOfferId] = useState('');

  const handleMouseEnter = (offerId: string) => {
    setActiveOfferId(offerId);
    onOffersListHover(offerId);
    console.log(activeOfferId);
  };

  const handleMouseLeave = () => {
    setActiveOfferId('');
    onOffersListHover('');
  };


  const handleFavoriteClick = (offer: Offer) => {
    if(!offer.isFavorite){
      dispatch(addToFavorites(offer.id));
    } else {
      dispatch(removeFromFavorites(offer.id));
    }
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map ((offer) => (
        <RentalOfferCard
          block='cities'
          offer = {offer}
          key = {offer.id}
          onMouseEnter={() => handleMouseEnter(offer.id)}
          onMouseLeave = {handleMouseLeave}
          onClick = {()=> handleFavoriteClick(offer)}
        />
      ))}
    </div>

  );
}

export default memo(OffersList);
