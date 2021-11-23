/* eslint-disable array-callback-return */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { createListing } from '../../graphql/mutations/createListing.graphql';
// Graphql Imports
import { Me } from '../../graphql/queries/me.graphql';
import { searchMake } from '../../graphql/queries/searchMake.graphql';
import { searchModel } from '../../graphql/queries/searchModel.graphql';

function Search() {
  const router = useRouter();
  const { loading: MeLoading, data: MeData } = useQuery(Me);
  const [formStep, setFormStep] = useState(1);
  const [message, setMessage] = useState(null);
  const { handleSubmit, control, getValues } = useForm({
    defaultValues: {
      make: '',
      model: 'Ford',
      year: '',
      price: '',
      description: '',
      images: []
    }
  });
  const [address, setAddress] = useState('');
  const [features, setFeatures] = useState([]);
  const [image, setImage] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [makeDataOptions, setMakeDataOptions] = useState([]);
  const [modelDataOptions, setModelDataOptions] = useState([]);

  // GraphQL
  const { loading: MakeListingLoading, data: MakeListingData } = useQuery(searchMake);
  const {
    loading: ModelListingLoading,
    data: ModelListingData,
    error: modelError
  } = useQuery(searchModel, {
    variables: {
      make: getValues('make')
    }
  });

  const [newListing, { data, error, loading }] = useMutation(createListing);

  const [coordinates, setCoordinates] = useState({
    lat: 54.3535,
    lng: 65.3424
  });

  useEffect(() => {
    if (formStep === 2) {
      MakeListingLoading
        ? setMakeDataOptions([
            {
              value: '',
              label: 'Loading...'
            }
          ])
        : MakeListingData.searchMake.map(item => {
            setMakeDataOptions(result => [...result, { value: item, label: item }]);
          });
    } else if (formStep === 3) {
      ModelListingLoading
        ? setModelDataOptions([
            {
              value: '',
              label: 'Loading...'
            }
          ])
        : ModelListingData.searchModel.map(item => {
            setModelDataOptions(result => [...result, { value: item, label: item }]);
          });
    }
  }, [formStep, MakeListingData, ModelListingData, MakeListingLoading, ModelListingLoading]);

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: coordinates.lat,
    longitude: coordinates.lng,
    zoom: 11
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

  // eslint-disable-next-line no-shadow
  const onSubmit = async data => {
    newListing({
      variables: {
        make: data.make,
        model: data.model,
        year: parseInt(data.year, 10),
        price: parseInt(data.price, 10),
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
  }, [data, error, router]);

  const customStyles = {
    menuList: styles => {
      return {
        ...styles,
        maxHeight: 215
      };
    },

    menu: () => ({
      width: '300px',
      borderRadius: '10px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
      backgroundColor: '#fff',
      border: '1px solid #e5e5e5',
      padding: '10px',
      position: 'absolute',
      height: '230px'
    }),

    control: () => ({
      width: '300px',
      border: '1.2px solid #000000',
      borderRadius: '10px',
      padding: '8px',
      fontSize: '1.2rem',
      color: '#000000',
      display: 'flex',
      justifyContent: 'space-between'
    })
  };

  const renderText = () => {
    if (formStep === 1) {
      return `Welcome Back, ${MeData?.me.name}`;
    } else if (formStep === 2) {
      return 'What is make of your car?';
    } else if (formStep === 3) {
      return 'What is model of your car?';
    } else if (formStep === 4) {
      return '{Lets get some details}';
    } else if (formStep === 5) {
      return '{Lets get some details}';
    }
  };

  /*
   Form Component
   */

  const renderForm = () => {
    if (formStep === 1) {
      return (
        <div>
          <h1 className="sm:text-5xl text-2xl font-medium text-white text-center px-10">Become a Host in 10 easy steps</h1>
          <h4 className="text-md font-extralight text-white text-center mt-5 px-5">Join us. Well help you every step of the way.</h4>
        </div>
      );
    } else if (formStep === 2) {
      return (
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ onChange, value }) => (
            <Select
              styles={customStyles}
              id="make"
              options={makeDataOptions}
              isMulti={false}
              placeholder="Select make"
              value={value}
              onChange={() => {
                onChange;
                setButtonDisabled(false);
              }}
            />
          )}
          name="make"
        />
      );
    } else if (formStep === 3) {
      return (
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ onChange, value }) => (
            <Select
              styles={customStyles}
              id="model"
              options={modelDataOptions}
              isMulti={false}
              placeholder="Select model"
              value={value}
              onChange={() => {
                onChange;
                setButtonDisabled(false);
              }}
            />
          )}
          name="model"
        />
      );
    }
  };

  /*
   Button Component
   */

  const renderButton = () => {
    if (formStep === 1) {
      return (
        <div
          className={`absolute flex justify-center sm:justify-end
         bottom-0 w-full sm:w-1/2 p-3 z-20`}
        >
          <button
            type="button"
            onClick={() => setFormStep(formStep + 1)}
            className="bg-indigo-600 text-white font-medium mb-2 py-3 px-24 sm:px-5 rounded-md shadow-lg"
          >
            Lets Go
          </button>
        </div>
      );
    } else if (formStep <= 9) {
      return (
        <div className={'absolute flex justify-between  bottom-0 w-full sm:w-1/2 p-3 z-20'}>
          <button
            type="button"
            onClick={() => setFormStep(formStep - 1)}
            className={'py-3 px-5 text-md content-center text-black underline'}
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => setFormStep(formStep + 1) && setButtonDisabled(true)}
            disabled={buttonDisabled}
            className={`${buttonDisabled ? 'bg-gray-400' : 'bg-black'} py-3 px-8 text-sm text-white rounded-md border`}
          >
            Next
          </button>
        </div>
      );
    } else {
      return loading ? (
        <button
          className={'bg-black py-2 px-24 text-sm text-white rounded border border-indigo-500 focus:outline-none focus:border-indigo-700'}
        >
          Loading...
        </button>
      ) : (
        <div className="flex justify-center items-center mt-6">
          <button
            type="button"
            onClick={() => setFormStep(formStep - 1)}
            className={
              'bg-indigo-600 py-2 w-20 mr-10 text-sm content-center text-white rounded border border-indigo-500 focus:outline-none focus:border-indigo-700'
            }
          >
            Back
          </button>
          <button
            type="submit"
            className={
              'bg-indigo-600 py-2 w-40 ml-10 text-sm text-white rounded border border-indigo-500 focus:outline-none focus:border-indigo-700'
            }
          >
            List your car
          </button>
        </div>
      );
    }
  };

  return (
    <div className="h-screen overflow-hidden">
      <div className="sm:flex">
        <div className="w-full sm:w-1/2 flex h-screen/3 sm:h-screen bg-gradient-to-r sm:bg-gradient-to-b from-indigo-600 to-pink-700 items-center justify-center">
          <h1 className="sm:text-5xl text-3xl font-medium text-white">{renderText()}</h1>
        </div>
        <div
          className={`flex flex-col w-full sm:w-1/2 -mt-5 sm:mt-0 h-screen sm:h-screen ${
            formStep === 1 ? 'bg-black' : 'bg-white'
          } items-center justify-center sm:rounded-none rounded-t-3xl z-10`}
        >
          <div className={`${formStep === 1 ? '-mt-96 sm:mt-0' : '-mt-96'}`}>{renderForm()}</div>

          {renderButton()}
        </div>
      </div>
    </div>
  );
}

export default Search;
