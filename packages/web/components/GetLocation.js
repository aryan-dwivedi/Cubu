import { LocationMarkerIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import ReactMapGL from 'react-map-gl';
import PlacesAutocomplete from 'react-places-autocomplete';
import Loading from './Loading';
export default function GetLocation() {
  const [address, setAddress] = useState('');
  const [gmapsLoaded, setGmapsLoaded] = useState(false);

  useEffect(() => {
    window.initMap = () => setGmapsLoaded(true);
    const gmapScriptEl = document.createElement('script');
    gmapScriptEl.src = 'https://maps.googleapis.com/maps/api/js?key=SECRET_EATING&libraries=places&callback=initMap';
    document.querySelector('body').insertAdjacentElement('beforeend', gmapScriptEl);
  }, []);

  const [selectedLocation] = useState({
    latitude: 28.7041,
    longitude: 77.1025
  });

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: selectedLocation.latitude,
    longitude: selectedLocation.longitude,
    zoom: 11
  });

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/mapbox/navigation-day-v1"
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={nextViewport => setViewport(nextViewport)}
    >
      <div className="flex items-center md:border-1 bg-white rounded-full m-40 py-2 z-2 md:shadow-sm">
        {gmapsLoaded && (
          <PlacesAutocomplete value={address} onChange={setAddress}>
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div className="w-full">
                <input
                  {...getInputProps({ placeholder: 'Start Searching Location...' })}
                  className="flex-grow h-10 px-5 w-full bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
                />
                <div className="absolute mt-5">
                  {loading ? <Loading /> : null}
                  {suggestions.map(suggestion => {
                    const style = {
                      backgroundColor: suggestion.active ? '#5465FF' : '#ffffff'
                    };

                    return (
                      <button {...getSuggestionItemProps(suggestion, { style })} key={suggestion}>
                        <div>
                          <LocationMarkerIcon width={30} height={30} color={'#5465FF'} />
                        </div>
                        <p>{suggestion.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        )}
      </div>
    </ReactMapGL>
  );
}
