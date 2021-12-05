/* eslint-disable array-callback-return */
import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { searchMake } from '../../graphql/queries/searchMake.graphql';
import { searchModel } from '../../graphql/queries/searchModel.graphql';

export default function Form(props) {
  const formStep = props.formStep;
  const { control, getValues } = useForm({
    defaultValues: {
      make: '',
      model: 'Ford',
      year: '',
      price: '',
      description: '',
      images: []
    }
  });
  const [makeDataOptions, setMakeDataOptions] = useState([]);
  const [modelDataOptions, setModelDataOptions] = useState([]);

  // GraphQL
  const { loading: MakeListingLoading, data: MakeListingData } = useQuery(searchMake);
  const { loading: ModelListingLoading, data: ModelListingData } = useQuery(searchModel, {
    variables: {
      make: getValues('make')
    }
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
            }}
          />
        )}
        name="model"
      />
    );
  }
}
