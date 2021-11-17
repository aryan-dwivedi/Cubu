import { useQuery } from "@apollo/client";
import { Me } from "../../graphql/queries/me.graphql";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { LocationMarkerIcon } from "@heroicons/react/solid";
import { PhotographIcon, CheckCircleIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import PlacesAutocomplete from "react-places-autocomplete";
import { createListing } from "../../graphql/mutations/createListing.graphql";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import Select from "react-select";

function Search() {
  const router = useRouter();
  const { loading: MeLoading, data: MeData } = useQuery(Me);
  const [formStep, setFormStep] = useState(1);
  const [message, setMessage] = useState(null);
  const [newListing, { data, error, loading }] = useMutation(createListing);
  const { handleSubmit, control } = useForm();
  const [address, setAddress] = useState("");
  const [features, setFeatures] = useState([]);
  const [image, setImage] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [coordinates, setCoordinates] = useState({
    lat: 54.3535,
    lng: 65.3424,
  });

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: coordinates.lat,
    longitude: coordinates.lng,
    zoom: 11,
  });

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
  };

  const featuresBox = (event) => {
    const isChecked = event.target.checked;
    const value = event.target.value;
    if (isChecked) {
      setFeatures([...features, value]);
    } else {
      setFeatures(features.filter((item) => item !== value));
    }
  };

  const handleImageDrop = (files) => {
    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data) => {
    newListing({
      variables: {
        make: data.make,
        model: data.model,
        year: parseInt(data.year),
        price: parseInt(data.price),
        description: data.description,
        features,
        picture: image,
        latitude: coordinates.lat,
        longitude: coordinates.lng,
      },
    });
  };

  useEffect(() => {
    if (data?.createListing) {
      setMessage("Listing created successfully");
      router.push("/");
    } else if (error) {
      setMessage("Error creating listing");
    }
  }, [data, error]);

  const renderText = () => {
    if (formStep === 1) {
      return `Welcome Back, ${MeData?.me.name}`;
    } else if (formStep === 2) {
      return `What is make of your car?`;
    } else if (formStep === 3) {
      return `What is model of your car?`;
    } else if (formStep === 4) {
      return `{Let's get some details}`;
    } else if (formStep === 5) {
      return `{Let's get some details}`;
    }
  };

  const aquaticCreatures = [
    { label: "Shark", value: "Shark" },
    { label: "Dolphin", value: "Dolphin" },
    { label: "Whale", value: "Whale" },
    { label: "Octopus", value: "Octopus" },
    { label: "Crab", value: "Crab" },
    { label: "Lobster", value: "Lobster" },
  ];

  const animal = [
    { label: "Shvfvark", value: "Shvfvark" },
    { label: "Shvfeevark", value: "Shvfeevark" },
    { label: "Shvfvvvark", value: "Shvfvvvark" },
    { label: "Shvfvarkkkk", value: "Shvfvarkkkk" },
    { label: "Shvfvaaaaark", value: "Shvfvaaaaark" },
    { label: "vvvfvvfv", value: "vvvfvvfv" },
  ];

  const customStyles = {
    menu: () => ({
      width: "300px",
      borderRadius: "10px",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
      backgroundColor: "#fff",
      border: "1px solid #e5e5e5",
      padding: "10px",
      position: "absolute",
    }),

    control: () => ({
      width: "300px",
      border: "1.2px solid #000000",
      borderRadius: "10px",
      padding: "8px",
      fontSize: "1.2rem",
      color: "#000000",
      display: "flex",
      justifyContent: "space-between",
    }),
  };

  const renderForm = () => {
    if (formStep === 1) {
      return (
        <div>
          <h1 className="sm:text-5xl text-2xl font-medium text-white text-center px-10">
            Become a Host in 10 easy steps
          </h1>
          <h4 className="text-md font-extralight text-white text-center mt-5 px-5">
            Join us. We'll help you every step of the way.
          </h4>
        </div>
      );
    } else if (formStep === 2) {
      return (
        <Controller
          render={({ onChange, value }) => (
            <Select
              styles={customStyles}
              id="make"
              options={aquaticCreatures}
              isMulti={false}
              placeholder="Select make"
              value={value}
              onChange={() => {
                onChange
                setButtonDisabled(false);
              }}
            />
          )}
          control={control}
          name="make"
          rules={{ required: true }}
        />
      );
    } else if (formStep === 3) {
      return (
        <Controller
          render={({ onChange, value }) => (
            <Select
              styles={customStyles}
              id="model"
              options={animal}
              isMulti={false}
              placeholder="Select model"
              value={value}
              onChange={() => {
                onChange
                setButtonDisabled(false);
              }}
            />
          )}
          control={control}
          name="model"
          rules={{ required: true }}
        />
      );
    }
  };

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
            Let's Go
          </button>
        </div>
      );
    } else if (formStep <= 9) {
      return (
        <div
          className={`absolute flex justify-between  bottom-0 w-full sm:w-1/2 p-3 z-20`}
        >
          <button
            type="button"
            onClick={() => setFormStep(formStep - 1)}
            className={`py-3 px-5 text-md content-center text-black underline`}
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => setFormStep(formStep + 1) && setButtonDisabled(true)}
            disabled={buttonDisabled}
            className={`${
              buttonDisabled ? "bg-gray-400" : "bg-black"
            } py-3 px-8 text-sm text-white rounded-md border`}
          >
            Next
          </button>
        </div>
      );
    } else {
      return loading ? (
        <button
          className={`bg-black py-2 px-24 text-sm text-white rounded border border-indigo-500 focus:outline-none focus:border-indigo-700`}
        >
          Loading...
        </button>
      ) : (
        <div className="flex justify-center items-center mt-6">
          <button
            type="button"
            onClick={() => setFormStep(formStep - 1)}
            className={`bg-indigo-600 py-2 w-20 mr-10 text-sm content-center text-white rounded border border-indigo-500 focus:outline-none focus:border-indigo-700`}
          >
            Back
          </button>
          <button
            type="submit"
            className={`bg-indigo-600 py-2 w-40 ml-10 text-sm text-white rounded border border-indigo-500 focus:outline-none focus:border-indigo-700`}
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
          <h1 className="sm:text-5xl text-3xl font-medium text-white">
            {renderText()}
          </h1>
        </div>
        <div
          className={`flex flex-col w-full sm:w-1/2 -mt-5 sm:mt-0 h-screen sm:h-screen ${
            formStep == 1 ? `bg-black` : `bg-white`
          } items-center justify-center sm:rounded-none rounded-t-3xl z-10`}
        >
          <div className={`${formStep == 1 ? "-mt-96 sm:mt-0" : "-mt-96"}`}>
            {renderForm()}
          </div>

          {renderButton()}
        </div>
      </div>
    </div>
  );
}

export default Search;
