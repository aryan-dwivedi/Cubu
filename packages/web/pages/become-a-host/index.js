import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import Form from '../../components/Form/Form';
import FormButton from '../../components/Form/FormButton';
import FormText from '../../components/Form/FormText';
import { Me } from '../../graphql/queries/me.graphql';

function Search() {
  const { data: MeData } = useQuery(Me);
  const [formStep, setFormStep] = useState(1);
  const [disabled, setDisabled] = useState(false);

  function handleStepChange(step) {
    setFormStep(step);
  }

  return (
    <div className="h-screen overflow-hidden">
      <div className="sm:flex">
        <div className="w-full sm:w-1/2 flex h-screen/3 sm:h-screen bg-gradient-to-r sm:bg-gradient-to-b from-indigo-600 to-pink-700 items-center justify-center">
          <h1 className="sm:text-5xl text-3xl font-medium text-white">
            <FormText formStep={formStep} name={MeData?.me.name} />
          </h1>
        </div>
        <div
          className={`flex flex-col w-full sm:w-1/2 -mt-5 sm:mt-0 h-screen sm:h-screen ${
            formStep === 1 ? 'bg-black' : 'bg-white'
          } items-center justify-center sm:rounded-none rounded-t-3xl z-10`}
        >
          <div className={`${formStep === 1 ? '-mt-96 sm:mt-0' : '-mt-96'}`}>
            <Form formStep={formStep} onChange={handleStepChange} />
          </div>
          <FormButton setFormStep={setFormStep} formStep={formStep} disabled={disabled} setDisabled={setDisabled} />
        </div>
      </div>
    </div>
  );
}

export default Search;
