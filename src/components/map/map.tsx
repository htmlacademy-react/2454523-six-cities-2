import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { DetailedOffer, Offer, Offers } from '../../types/offer';
import { MapProps } from '../../types/map';
import useMap from '../../hooks/use-map';


const blueIcon = new Icon({
  iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-blue.png',
  shadowUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const orangeIcon = new Icon({
  iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-orange.png',
  shadowUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const mapSectionStyle = {
  height: '100%',
  minHeight: '500px',
  width: '100%',
  maxWidth: '1144px',
  margin: '0 auto'
};

function createMarker (offer: Offer,
  selectedOffer?: Offer,
)
: Marker {
  const marker = new Marker({
    lat: offer.location.latitude,
    lng: offer.location.longitude
  });

  marker
    .setIcon(
      selectedOffer !== undefined && offer.id === selectedOffer.id
        ? orangeIcon
        : blueIcon
    );

  return marker;
}

function createMarkerForCurrentOffer (currentOffer: DetailedOffer,
)
: Marker {
  const markerForCurrentOffer = new Marker({
    lat: currentOffer.location.latitude,
    lng: currentOffer.location.longitude
  });

  markerForCurrentOffer
    .setIcon(
      orangeIcon
    );

  return markerForCurrentOffer;
}

function addMarkersToMap (map: L.Map, offers: Offers, selectedOffer?: Offer, currentOffer?: DetailedOffer) : L.LayerGroup{
  const markerLayer = layerGroup().addTo(map);

  offers.forEach((offer) => {
    const marker = createMarker(offer,selectedOffer);
    marker.addTo(markerLayer);
  });

  if(currentOffer){
    const markerForCurrentOffer = createMarkerForCurrentOffer(currentOffer);
    markerForCurrentOffer.addTo(markerLayer);
  }


  return markerLayer;
}

function removeMarkerLayer (map: L.Map, markerLayer: L.LayerGroup) : void {
  map.removeLayer(markerLayer);
}

function Map (props: MapProps): JSX.Element {

  const {block, location, offers, selectedOffer, currentOffer} = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, location);

  useEffect(() => {
    if (map) {
      map.setView([location.lat, location.lng], location.zoom);
    }
  }, [map, location]);


  useEffect(() => {
    if (!map) {
      return;
    }

    const markerLayer = addMarkersToMap(map, offers, selectedOffer, currentOffer);

    return () => {
      removeMarkerLayer(map,markerLayer);
    };

  }, [map, offers, selectedOffer,currentOffer]);

  return (
    <section
      className={`${block}__map map`}
      ref= {mapRef}
      style ={mapSectionStyle}
    />
  );
}

export default Map;
