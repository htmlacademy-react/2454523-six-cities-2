import { Offer } from '../../types/offer';
import RentalOfferCard from '../main-screen/rental-offer-card';

type NearbyOfferCardProps = {
  neighboringOffer: Offer;
}

function NearbyOfferCard (props: NearbyOfferCardProps) : JSX.Element {
  const {neighboringOffer} = props;
  return <RentalOfferCard block = 'near-places' offer = {neighboringOffer}/> ;
}

export default NearbyOfferCard;
