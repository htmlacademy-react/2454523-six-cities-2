import { useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Offer } from '../../types/offer';
import RentalOfferCard from '../main-screen/rental-offer-card';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addToFavorites, removeFromFavorites } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user-process/user-process-selectors';

export type NearbyOfferCardProps = {
  neighboringOffer: Offer;
}

function NearbyOfferCard ({neighboringOffer}: NearbyOfferCardProps) : JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const handleOfferFavoriteClick = (offer: Offer) => {

    if(authorizationStatus === AuthorizationStatus.NoAuth) {
      navigate(AppRoute.Login, { replace: true });
      return;
    }

    if(!offer.isFavorite){
      dispatch(addToFavorites(offer.id));
    } else {
      dispatch(removeFromFavorites(offer.id));
    }
  };
  return <RentalOfferCard block = 'near-places' offer = {neighboringOffer} onOfferFavoriteClick = {()=> handleOfferFavoriteClick(neighboringOffer)}/> ;
}

export default NearbyOfferCard;
