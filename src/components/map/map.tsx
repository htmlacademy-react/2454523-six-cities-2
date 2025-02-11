import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Offers } from '../../types/offer';
import { AmsterdamCenterCoords } from '../../types/offer';
import useMap from '../../hooks/use-map';

type MapProps ={
  city: AmsterdamCenterCoords;
  offers: Offers;
}

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


function Map (props: MapProps): JSX.Element {

  const {city, offers} = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker
          .setIcon(
            orangeIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers]);

  return (
    <section className="cities__map map"
      style ={{height: '1000px'}}
      ref= {mapRef}
    >
    </section>
  );
}

export default Map;
