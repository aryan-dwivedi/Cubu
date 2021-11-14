import { useQuery } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import InfoCard from "../../components/InfoCard";
import { Me } from "../../graphql/queries/me.graphql";
import { searchListings } from "../../graphql/queries/searchListings.graphql";

function Search() {
  const router = useRouter();
  const { loading: MeLoading, data: MeData } = useQuery(Me);
  const { lat, lng } = router.query;

  const { loading, data, error } = useQuery(searchListings, {
    variables: {},
  });

  const listings = data?.searchListings;

  console.log(MeData);

  return (
    <div className="h-screen">
      <div className="flex">
        <div className="w-full sm:w-1/2 flex h-56 sm:h-screen bg-gradient-to-r sm:bg-gradient-to-b from-indigo-600 to-pink-700 items-center justify-center">
          <h1 className="sm:text-5xl text-3xl font-bold text-white">Welcome Back, {MeData?.me.name} </h1>
        </div>
      </div>
    </div>
  );
}

export default Search;

{
  /* <div className="flex flex-col overflow-auto h-screen">
            {loading ? (
              <p>Loading...</p>
            ) : (
              listings?.map(({ id, make, model, description, year, price, pictureUrl }) => (
                <InfoCard key={id} make={make} model={model} description={description} year={year} price={price} pictureUrl={pictureUrl} />
              ))
            )}
          </div> */
}
