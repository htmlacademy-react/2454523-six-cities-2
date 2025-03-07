import {useEffect, useState, MutableRefObject, useRef} from 'react';
import {Map, TileLayer} from 'leaflet';
import { CityCoords } from '../types/map';
import { TILE_LAYER, COPYRIGHT } from '../const';

export default function useMap (
  mapRef: MutableRefObject<HTMLElement | null>,
  location: CityCoords
): Map | null {


  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if(mapRef.current === null || isRenderedRef.current){
      return;
    }

    const instance = new Map(mapRef.current, {
      center: {
        lat: location.lat,
        lng: location.lng
      },
      zoom: location.zoom
    });
    const layer = new TileLayer(
      TILE_LAYER,
      {
        attribution:
          COPYRIGHT
      }
    );
    instance.addLayer(layer);

    setMap(instance);
    isRenderedRef.current = true;

  }, [mapRef, location]);

  return map;
}

