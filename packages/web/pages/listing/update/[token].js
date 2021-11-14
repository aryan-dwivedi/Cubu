import { useMutation, useQuery } from '@apollo/client';
import { LocationMarkerIcon, PhotographIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { useForm } from 'react-hook-form';
import PlacesAutocomplete from 'react-places-autocomplete';
import Header from '../../../components/Header';
import { updateListing } from '../../../graphql/mutations/updateListing.graphql';
import { viewListing } from '../../../graphql/queries/viewListing.graphql';

export default function RegisterPage() {
  const router = useRouter();
  const [message, setMessage] = useState(null);
  const [update, { data, error, loading }] = useMutation(updateListing);
  const { register, handleSubmit } = useForm();
  const [address, setAddress] = useState('');
  const [features, setFeatures] = useState([]);
  const [image, setImage] = useState(null);
  const [coordinates, setCoordinates] = useState({
    lat: 54.3535,
    lng: 65.3424
  });
  const { data: listingData, loading: listingLoading } = useQuery(viewListing, {
    variables: {
      id: router.query.token
    }
  });

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
  };

  const featuresBox = event => {
    const isChecked = event.target.checked;
    const value = event.target.value;
    if (isChecked) {
      setFeatures([...features, value]);
    } else {
      setFeatures(features.filter(item => item !== value));
    }
  };

  const handleImageDrop = files => {
    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async data => {
    update({
      variables: {
        listingId: router.query.id,
        make: data.make,
        model: data.model,
        year: parseInt(data.year),
        price: parseInt(data.price),
        description: data.description,
        features,
        picture: image,
        latitude: coordinates.lat,
        longitude: coordinates.lng
      }
    });
  };

  useEffect(() => {
    if (data?.createListing) {
      setMessage('Listing created successfully');
      router.push('/');
    } else if (error) {
      setMessage('Error creating listing');
    }
  }, [data]);

  return (
    <div>
      <Header />
      <div className="flex">
        <div className="w-full max-w-sm bg-white px-16 m-4">
          <h1 className="text-2xl font-medium text-primary mb-12 ml-10 text-center">Update your Listing</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="flex">
            <div>
              <div>
                <label htmlFor="make" className="text-sm">
                  Make
                </label>
                <input
                  type="text"
                  name="make"
                  className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4 w-96`}
                  id="make"
                  placeholder="Make"
                  autoComplete="off"
                  value={listingData?.viewListing?.make}
                  {...register('make')}
                />
              </div>
              <div>
                <label htmlFor="model" className="text-sm">
                  Model
                </label>
                <input
                  type="text"
                  name="model"
                  className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4 w-96`}
                  id="model"
                  placeholder="Model"
                  autoComplete="off"
                  value={listingData?.viewListing?.model}
                  {...register('model')}
                />
              </div>
              <div>
                <label htmlFor="year" className="text-sm">
                  Year
                </label>
                <input
                  type="number"
                  name="year"
                  className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4 w-96`}
                  id="year"
                  placeholder="Year"
                  autoComplete="off"
                  value={listingData?.viewListing?.year}
                  {...register('year')}
                />
              </div>
              <div>
                <label htmlFor="description" className="text-sm">
                  Description
                </label>
                <textarea
                  type="text"
                  name="description"
                  cols="40"
                  rows="10"
                  className={`w-full text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                  id="description"
                  autoComplete="off"
                  value={listingData?.viewListing?.description}
                  {...register('description')}
                />
              </div>
            </div>
            <div className="ml-20 mt-4">
              <div className="flex items-center py-2">
                <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
                  {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div className="w-full">
                      <input
                        {...getInputProps({ placeholder: 'Car Location address' })}
                        className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4 w-96
                        "
                      />
                      <div className="absolute">
                        {loading ? <div>...loading</div> : null}
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
              </div>
              <div className="flex items-center py-2">
                <div className="w-full">
                  <label htmlFor="price" className="text-sm">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4 w-96`}
                    id="price"
                    placeholder="Price"
                    autoComplete="off"
                    value={listingData?.viewListing?.price}
                    {...register('price')}
                  />
                </div>
              </div>
              <div className="flex items-center py-2">
                <div className="w-full">
                  <label htmlFor="features" className="text-sm">
                    Features
                  </label>
                  <div className="flex m-4 flex-col">
                    <div>
                      <input type="checkbox" name="features" value="Air Conditioner" onChange={featuresBox} 
                      checked={listingData?.viewListing?.features.includes('Air Conditioner')}
                      />
                      <label htmlFor="feature1" className="mx-4">
                        Air Conditioner
                      </label>
                    </div>
                    <div>
                      <input type="checkbox" name="features" value="Bluetooth" onChange={featuresBox}
                      checked={listingData?.viewListing?.features.includes('Bluetooth')}
                       />
                      <label htmlFor="feature2" className="mx-4">
                        Bluetooth
                      </label>
                    </div>
                    <div>
                      <input type="checkbox" name="features" value="Heated Seats" onChange={featuresBox} 
                      checked={listingData?.viewListing?.features.includes('Heated Seats')}
                      />
                      <label htmlFor="feature3" className="mx-4">
                        Heated Seats
                      </label>
                    </div>
                    <div>
                      <input type="checkbox" name="features" value="ADAS Technology" onChange={featuresBox} 
                      checked={listingData?.viewListing?.features.includes('ADAS Technology')}
                      />
                      <label htmlFor="feature4" className="mx-4">
                        ADAS Technology
                      </label>
                    </div>
                    <div>
                      <input type="checkbox" name="features" value="Fastag Enabled" onChange={featuresBox} 
                      checked={listingData?.viewListing?.features.includes('Fastag Enabled')}
                       />
                      <label htmlFor="feature5" className="mx-4">
                        Fastag Enabled
                      </label>
                    </div>
                    <div>
                      <input type="checkbox" name="features" value="Sunroof" onChange={featuresBox}
                      checked={listingData?.viewListing?.features.includes('Sunroof')}
                       />
                      <label htmlFor="feature6" className="mx-4">
                        Sunroof
                      </label>
                    </div>
                    <div>
                      <input type="checkbox" name="features" value="Power Windows" onChange={featuresBox}
                      checked={listingData?.viewListing?.features.includes('Power Windows')}
                       />
                      <label htmlFor="feature7" className="mx-4">
                        Power Windows
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="ml-20 mt-4">
              <div className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4 h-52 w-96 flex justify-center items-center">
                <Dropzone accept="image/jpeg, image/png" multiple={false} onDrop={handleImageDrop}>
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {image == null && (
                          <div>
                            <PhotographIcon width={80} height={80} color={'#5465FF'} />
                            <p className="size-md">Upload a car image</p>
                          </div>
                        )}
                        {listingData?.viewListing?.pictureUrl != null && <Image src={listingData?.viewListing?.pictureUrl} width={300} height={190} />}
                      </div>
                    </section>
                  )}
                </Dropzone>
              </div>
              {message != null && <p className="text-center text-red-500 text-sm mt-2">{message}</p>}
              <div className="flex justify-center items-center mt-6">
                {loading ? (
                  <button
                    className={`bg-indigo-500 py-2 px-24 text-sm text-white rounded border border-indigo-500 focus:outline-none focus:border-indigo-700`}
                  >
                    Loading...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className={`bg-indigo-500 py-2 px-24 text-sm text-white rounded border border-indigo-500 focus:outline-none focus:border-indigo-700`}
                  >
                    List you Car
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
