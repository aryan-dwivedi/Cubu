/* eslint-disable no-undef */
import { LocationMarkerIcon, SearchIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import Loading from './Loading';
export default function SearchBar() {
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null
  });

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
  };

  const search = () => {
    router.push({
      pathname: '/search',
      query: {
        lat: coordinates.lat,
        lng: coordinates.lng
      }
    });
  };

  return (
    <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
      <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="w-full">
            <input
              {...getInputProps({ placeholder: 'Where are you going?' })}
              className="flex-grow pl-5 pr-100 w-full bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
            />
            <div className="absolute mt-5">
              {loading ? <Loading /> : null}
              {suggestions.map(suggestion => {
                const style = {
                  backgroundColor: suggestion.active ? '#5465FF' : '#fff'
                };

                return (
                  <button {...getSuggestionItemProps(suggestion, { style })} key={suggestion} onClick={search}>
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
  );
}
