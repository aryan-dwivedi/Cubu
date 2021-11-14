import { useMutation } from "@apollo/client";
import { LocationMarkerIcon } from "@heroicons/react/solid";
import { PhotographIcon, CheckCircleIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { useForm } from "react-hook-form";
import PlacesAutocomplete from "react-places-autocomplete";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { createListing } from "../../../graphql/mutations/createListing.graphql";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

export default function RegisterPage() {
  const router = useRouter();
  const [formStep, setFormStep] = useState(1);
  const [message, setMessage] = useState(null);
  const [newListing, { data, error, loading }] = useMutation(createListing);
  const { register, handleSubmit } = useForm();
  const [address, setAddress] = useState("");
  const [features, setFeatures] = useState([]);
  const [image, setImage] = useState(null);

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

  const renderButton = () => {
    if (formStep == 1) {
      return (
        <div className="flex justify-center items-center mt-6">
          <button
            type="button"
            onClick={() => setFormStep(formStep + 1)}
            className={`bg-indigo-500 py-2 w-40 text-sm text-white rounded border border-indigo-500 focus:outline-none focus:border-indigo-700`}
          >
            Next Step
          </button>
        </div>
      );
    } else if (formStep <= 3) {
      return (
        <div className="flex justify-center items-center mt-6">
          <button
            type="button"
            onClick={() => setFormStep(formStep - 1)}
            className={`bg-indigo-500 py-2 w-20 mr-10 text-sm content-center text-white rounded border border-indigo-500 focus:outline-none focus:border-indigo-700`}
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => setFormStep(formStep + 1)}
            className={`bg-indigo-500 py-2 w-20 ml-10 text-sm text-white rounded border border-indigo-500 focus:outline-none focus:border-indigo-700`}
          >
            Next
          </button>
        </div>
      );
    } else {
      return loading ? (
        <button
          className={`bg-indigo-500 py-2 px-24 text-sm text-white rounded border border-indigo-500 focus:outline-none focus:border-indigo-700`}
        >
          Loading...
        </button>
      ) : (
        <div className="flex justify-center items-center mt-6">
        <button
          type="button"
          onClick={() => setFormStep(formStep - 1)}
          className={`bg-indigo-500 py-2 w-20 mr-10 text-sm content-center text-white rounded border border-indigo-500 focus:outline-none focus:border-indigo-700`}
        >
          Back
        </button>
        <button
          type="submit"
          className={`bg-indigo-500 py-2 w-40 ml-10 text-sm text-white rounded border border-indigo-500 focus:outline-none focus:border-indigo-700`}
        >
          List your car
        </button>
      </div>
      );
    }
  };

  return (
    <div>
      <Header />
      <div className="flex mt-20 content-center justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="flex">
          <div className="w-full max-w-lg bg-white px-16 m-auto">
            <h1 className="text-2xl font-medium text-primary text-center mb-10">
              List your car (step {formStep}/4)
            </h1>
            <div className="flex-col">
              {formStep === 1 && (
                <div>
                  <div>
                    <label htmlFor="make" className="text-sm">
                      Make
                    </label>
                    <input
                      type="text"
                      name="make"
                      className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                      id="make"
                      placeholder="Make"
                      autoComplete="off"
                      {...register("make")}
                    />
                  </div>
                  <div>
                    <label htmlFor="model" className="text-sm">
                      Model
                    </label>
                    <input
                      type="text"
                      name="model"
                      className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                      id="model"
                      placeholder="Model"
                      autoComplete="off"
                      {...register("model")}
                    />
                  </div>
                  <div>
                    <label htmlFor="year" className="text-sm">
                      Year
                    </label>
                    <input
                      type="number"
                      name="year"
                      className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                      id="year"
                      placeholder="Year"
                      autoComplete="off"
                      {...register("year")}
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
                      className={`w-full p-4 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                      id="description"
                      autoComplete="off"
                      {...register("description")}
                    />
                  </div>
                  <div>
                    <label htmlFor="price" className="text-sm">
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                      id="price"
                      placeholder="Price"
                      autoComplete="off"
                      {...register("price")}
                    />
                  </div>
                </div>
              )}

              {formStep === 2 && (
                <div>
                  <PlacesAutocomplete
                    value={address}
                    onChange={setAddress}
                    onSelect={handleSelect}
                  >
                    {({
                      getInputProps,
                      suggestions,
                      getSuggestionItemProps,
                      loading,
                    }) => (
                      <div>
                        <input
                          {...getInputProps({
                            placeholder: "Car Location address",
                          })}
                          className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out`}
                        />
                        <div className="absolute">
                          {loading ? <div>...loading</div> : null}
                          {suggestions.map((suggestion) => {
                            const style = {
                              backgroundColor: suggestion.active
                                ? "#5465FF"
                                : "#fff",
                            };

                            return (
                              <button
                                {...getSuggestionItemProps(suggestion, {
                                  style,
                                })}
                                key={suggestion}
                                onClick={search}
                              >
                                <div>
                                  <LocationMarkerIcon
                                    width={30}
                                    height={30}
                                    color={"#5465FF"}
                                  />
                                </div>
                                <p>{suggestion.description}</p>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </PlacesAutocomplete>
                  <section className="min-w-[200px] xl:inline-flex xl:min-w-[380px] h-80 mt-10">
                    <ReactMapGL
                      mapStyle="mapbox://styles/mapbox/light-v10"
                      mapboxApiAccessToken={process.env.mapbox_key}
                      {...viewport}
                      onViewportChange={(nextViewport) =>
                        setViewport(nextViewport)
                      }
                    >
                      <Marker
                        longitude={coordinates.lng}
                        latitude={coordinates.lat}
                        offsetLeft={0}
                        offsetTop={0}
                        onDragEnd={() => setCoordinates([0, 0])}
                      >
                        <p
                          onClick={() => setCoordinates([0, 0])}
                          className="cursor-pointer text-2xl animate-bounce"
                        >
                          <LocationMarkerIcon className="h-6 text-indigo-500" />
                        </p>
                      </Marker>
                    </ReactMapGL>
                  </section>
                </div>
              )}

              {formStep === 3 && (
                <div>
                  <div className="flex items-center -mx-14 py-2">
                    <div>
                      <label htmlFor="features" className="text-lg">
                        Tell us about features of your car
                      </label>
                      <div className="flex flex-row mt-4">
                        <div className="flex-col items-center">
                          <div className="m-4">
                            <input
                              type="checkbox"
                              name="features"
                              value="Air Conditioner"
                              onChange={featuresBox}
                            />
                            <label htmlFor="feature1" className="ml-2">
                              Air Conditioner
                            </label>
                          </div>
                          <div className="m-4">
                            <input
                              type="checkbox"
                              name="features"
                              value="Bluetooth"
                              onChange={featuresBox}
                            />
                            <label htmlFor="feature2" className="ml-2">
                              Bluetooth
                            </label>
                          </div>
                          <div className="m-4">
                            <input
                              type="checkbox"
                              name="features"
                              value="Heated Seats"
                              onChange={featuresBox}
                            />
                            <label htmlFor="feature3" className="ml-2">
                              Heated Seats
                            </label>
                          </div>
                          <div className="m-4">
                            <input
                              type="checkbox"
                              name="features"
                              value="ADAS Technology"
                              onChange={featuresBox}
                            />
                            <label htmlFor="feature4" className="ml-2">
                              ADAS Technology
                            </label>
                          </div>
                          <div className="m-4">
                            <input
                              type="checkbox"
                              name="features"
                              value="Fastag Enabled"
                              onChange={featuresBox}
                            />
                            <label htmlFor="feature5" className="ml-2">
                              Fastag Enabled
                            </label>
                          </div>
                          <div className="m-4">
                            <input
                              type="checkbox"
                              name="features"
                              value="Sunroof"
                              onChange={featuresBox}
                            />
                            <label htmlFor="feature6" className="ml-2">
                              Sunroof
                            </label>
                          </div>
                          <div className="m-4">
                            <input
                              type="checkbox"
                              name="features"
                              value="Power Windows"
                              onChange={featuresBox}
                            />
                            <label htmlFor="feature7" className="ml-2">
                              Power Windows
                            </label>
                          </div>
                        </div>
                        <div className="flex-col items-center">
                          <div className="m-4">
                            <input
                              type="checkbox"
                              name="features"
                              value="Air Conditioner"
                              onChange={featuresBox}
                            />
                            <label htmlFor="feature1" className="ml-2">
                              Air Conditioner
                            </label>
                          </div>
                          <div className="m-4">
                            <input
                              type="checkbox"
                              name="features"
                              value="Bluetooth"
                              onChange={featuresBox}
                            />
                            <label htmlFor="feature2" className="ml-2">
                              Bluetooth
                            </label>
                          </div>
                          <div className="m-4">
                            <input
                              type="checkbox"
                              name="features"
                              value="Heated Seats"
                              onChange={featuresBox}
                            />
                            <label htmlFor="feature3" className="ml-2">
                              Heated Seats
                            </label>
                          </div>
                          <div className="m-4">
                            <input
                              type="checkbox"
                              name="features"
                              value="ADAS Technology"
                              onChange={featuresBox}
                            />
                            <label htmlFor="feature4" className="ml-2">
                              ADAS Technology
                            </label>
                          </div>
                          <div className="m-4">
                            <input
                              type="checkbox"
                              name="features"
                              value="Fastag Enabled"
                              onChange={featuresBox}
                            />
                            <label htmlFor="feature5" className="ml-2">
                              Fastag Enabled
                            </label>
                          </div>
                          <div className="m-4">
                            <input
                              type="checkbox"
                              name="features"
                              value="Sunroof"
                              onChange={featuresBox}
                            />
                            <label htmlFor="feature6" className="ml-2">
                              Sunroof
                            </label>
                          </div>
                          <div className="m-4">
                            <input
                              type="checkbox"
                              name="features"
                              value="Power Windows"
                              onChange={featuresBox}
                            />
                            <label htmlFor="feature7" className="ml-2">
                              Power Windows
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {formStep === 4 && (
                <div className="mt-4">
                  <div className="flex flex-col items-center py-2">
                    <p>
                      High quality photos increase your earning potential by
                      attracting more guests. Upload at least 6 photos,
                      including multiple exterior angles with the whole car in
                      frame, as well as interior shots.
                    </p>
                    <div className="mt-4">
                      <div className="flex-col items-center">
                        <div className="m-4 flex flex-row items-center">
                          <CheckCircleIcon
                            width={30}
                            height={30}
                            color={"#5465FF"}
                          />
                          <p className="ml-1">Shoot during the daytime</p>
                        </div>
                        <div className="m-4 flex flex-row items-center">
                          <CheckCircleIcon
                            width={30}
                            height={30}
                            color={"#5465FF"}
                          />
                          <p className="ml-1">Take clear, crisp photos</p>
                        </div>
                        <div className="m-4 flex flex-row items-center">
                          <CheckCircleIcon
                            width={30}
                            height={30}
                            color={"#5465FF"}
                          />
                          <p className="ml-1">Try somewhere open or scenic</p>
                        </div>
                        <div className="m-4 flex flex-row items-center">
                          <CheckCircleIcon
                            width={30}
                            height={30}
                            color={"#5465FF"}
                          />
                          <p className="ml-1">Look out for moving cars</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4 h-52  flex justify-center items-center">
                    <Dropzone
                      accept="image/jpeg, image/png"
                      multiple={false}
                      onDrop={handleImageDrop}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <section className="items-center m-auto">
                          <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            {image == null && (
                              <div>
                                <PhotographIcon
                                  width={80}
                                  height={80}
                                  color={"#5465FF"}
                                />
                                <p className="size-md">Upload a car image</p>
                              </div>
                            )}
                            {image != null && (
                              <Image src={image} width={300} height={190} />
                            )}
                          </div>
                        </section>
                      )}
                    </Dropzone>
                  </div>
                  {message != null && (
                    <p className="text-center text-red-500 text-sm mt-2">
                      {message}
                    </p>
                  )}
                </div>
              )}
              <div className="flex justify-center items-center mb-10">
                {renderButton()}
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
