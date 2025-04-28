import { renderHook } from '@testing-library/react';
import useMap from './use-map';
import { vi } from 'vitest';
import type { MutableRefObject } from 'react';
import { Map as LeafletMap, TileLayer as LeafletTileLayer } from 'leaflet';
import { CityCoords } from '../types/map';


vi.mock('leaflet', () => {
  const Map = vi.fn().mockImplementation((
  ): LeafletMap => {
    const mapStub: Partial<LeafletMap> = {
      addLayer: vi.fn(),
    };

    return mapStub as LeafletMap;
  });

  const TileLayer = vi.fn().mockImplementation((
  ): LeafletTileLayer => ({} as LeafletTileLayer));

  return { Map, TileLayer };
});

describe('useMap', () => {
  it('should not create a map when mapRef.current is null', () => {
    const mapRef = { current: null } as MutableRefObject<HTMLElement | null>;
    const location: CityCoords = { title: 'Paris', lat: 10, lng: 20, zoom: 5 };

    const { result } = renderHook(() => useMap(mapRef, location));

    expect(result.current).toBeNull();
    expect(LeafletMap).not.toHaveBeenCalled();
  });

  it('should call the Map constructor with correct options', () => {
    const container = document.createElement('div');
    const mapRef = { current: container } as MutableRefObject<HTMLElement>;
    const location: CityCoords = { title: 'Paris', lat: 10, lng: 20, zoom: 5 };

    renderHook(() => useMap(mapRef, location));

    expect(LeafletMap).toHaveBeenCalledWith(
      container,
      expect.objectContaining({ center: { lat: 10, lng: 20 }, zoom: 5 })
    );
  });

  it('should add a layer via TileLayer and invoke addLayer', () => {
    const container = document.createElement('div');
    const mapRef = { current: container } as MutableRefObject<HTMLElement>;
    const location: CityCoords = { title: 'Paris', lat: 10, lng: 20, zoom: 5 };

    const { result } = renderHook(() => useMap(mapRef, location));

    expect(LeafletTileLayer).toHaveBeenCalled();
    expect((result.current as LeafletMap).addLayer).toHaveBeenCalled();
  });
});
