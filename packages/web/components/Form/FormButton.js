import React, { useState } from 'react';

export default function FormButton() {
  const [formStep, setFormStep] = useState(1);
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
        <button type="button" onClick={() => setFormStep(formStep - 1)} className={'py-3 px-5 text-md content-center text-black underline'}>
          Back
        </button>
        <button
          type="button"
          //   onClick={() => setFormStep(formStep + 1) && setButtonDisabled(true)}
          //   disabled={buttonDisabled}
          //   className={`${buttonDisabled ? 'bg-gray-400' : 'bg-black'} py-3 px-8 text-sm text-white rounded-md border`}
        >
          Next
        </button>
      </div>
    );
  } else {
    // return loading ? (
    //   <button
    //     className={'bg-black py-2 px-24 text-sm text-white rounded border border-indigo-500 focus:outline-none focus:border-indigo-700'}
    //   >
    //     Loading...
    //   </button>
    // ) : (
    return (
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
}
