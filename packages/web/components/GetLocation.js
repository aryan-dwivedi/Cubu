import { LocationMarkerIcon, SearchIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';
import PlacesAutocomplete from 'react-places-autocomplete';
export default function GetLocation() {
  const [address, setAddress] = useState('');
  const [selectedLocation, setSelectedLocation] = useState({
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

  // eslint-disable-next-line no-console
  console.log('vfovmfomv', selectedLocation);

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/mapbox/light-v10"
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={nextViewport => setViewport(nextViewport)}
    >
      <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
        <PlacesAutocomplete value={address} onChange={setAddress}>
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div className="w-full">
              <input
                {...getInputProps({ placeholder: 'Where are you going?' })}
                className="flex-grow pl-5 pr-100 w-full bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
              />
              <div className="absolute mt-5">
                {loading ? <div>...loading</div> : null}
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
        <SearchIcon className="hidden md:inline-flex h-8 bg-indigo-500 text-white rounded-full p-2 cursor-pointer md:mx-2" />
      </div>
    </ReactMapGL>
  );
}
