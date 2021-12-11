/* eslint-disable no-console */
/* eslint-disable array-callback-return */
import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { searchMake } from '../../graphql/queries/searchMake.graphql';
import { searchModel } from '../../graphql/queries/searchModel.graphql';
import { searchYear } from '../../graphql/queries/searchYear.graphql';
import GetLocation from '../GetLocation';

export default function Form(props) {
  const formStep = props.formStep;
  const { control, getValues } = useForm({
    defaultValues: {
      make: '',
      model: '',
      year: null,
      price: null,
      latitude: null,
      longitude: null,
      description: null,
      features: [],
      images: []
    }
  });
  const [makeDataOptions, setMakeDataOptions] = useState([]);
  const [modelDataOptions, setModelDataOptions] = useState([]);
  const [yearDataOptions, setYearDataOptions] = useState([]);

  // GraphQL
  const { loading: MakeListingLoading, data: MakeListingData } = useQuery(searchMake);
  const { loading: ModelListingLoading, data: ModelListingData } = useQuery(searchModel, {
    variables: {
      make: getValues('make').value
    }
  });
  const { loading: YearListingLoading, data: YearListingData } = useQuery(searchYear, {
    variables: {
      make: getValues('make').value,
      model: getValues('model').value
    }
  });

  useEffect(() => {
    const value = getValues();
    console.log(value);
    console.log(YearListingData);
  }, [YearListingData, getValues]);

  useEffect(() => {
    if (formStep === 2) {
      MakeListingLoading ? (
        <div>Loading</div>
      ) : (
        MakeListingData.searchMake.map(item => {
          setMakeDataOptions(result => [...result, { value: item, label: item }]);
        })
      );
    } else if (formStep === 3) {
      ModelListingLoading ? (
        <div>Loading</div>
      ) : (
        ModelListingData.searchModel.map(item => {
          setModelDataOptions(result => [...result, { value: item, label: item }]);
        })
      );
    } else if (formStep === 4) {
      YearListingLoading ? (
        <div>Loading</div>
      ) : (
        YearListingData.searchYear.map(item => {
          setYearDataOptions(result => [...result, { value: item, label: item }]);
        })
      );
    }
  }, [formStep, MakeListingData, ModelListingData, MakeListingLoading, ModelListingLoading, YearListingLoading, YearListingData]);

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
    return MakeListingLoading ? (
      <div>Loading...</div>
    ) : (
      <Controller
        name="make"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Select {...field} styles={customStyles} id="make" options={makeDataOptions} isMulti={false} placeholder="Select make" />
        )}
      />
    );
  } else if (formStep === 3) {
    return ModelListingLoading ? (
      <div>Loading...</div>
    ) : (
      <Controller
        control={control}
        rules={{ required: true }}
        name="model"
        render={({ field }) => (
          <Select {...field} styles={customStyles} id="model" options={modelDataOptions} isMulti={false} placeholder="Select model" />
        )}
      />
    );
  } else if (formStep === 4) {
    return YearListingLoading ? (
      <div>Loading...</div>
    ) : (
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Select {...field} styles={customStyles} id="year" options={yearDataOptions} isMulti={false} placeholder="Select Year" />
        )}
        name="year"
      />
    );
  } else if (formStep === 5) {
    return (
      <div className="w-100 h-100">
        <GetLocation />
      </div>
    );
  }
}
