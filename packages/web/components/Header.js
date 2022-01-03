/* eslint-disable @next/next/no-sync-scripts */ // used for google maps
import { useMutation, useQuery } from '@apollo/client';
import { MenuIcon, UserCircleIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Logout } from '../graphql/mutations/logout.graphql';
import { Me } from '../graphql/queries/me.graphql';
import Loading from './Loading';
import SearchBar from './SearchBar';

function Header() {
  const [showloginOptions, setshowloginOptions] = useState(false);
  const router = useRouter();
  const [logout] = useMutation(Logout);
  const { loading, data } = useQuery(Me);
  let body = null;

  const signOut = async () => {
    await logout();
    router.reload();
  };

  const toggleLoginOptions = () => {
    setshowloginOptions(!showloginOptions);
  };

  useEffect(() => {
    window.onscroll = () => {
      if (window.pageYOffset > 50) {
        setshowloginOptions(false);
      }
    };
  }, []);

  if (data?.me) {
    body = (
      <div className="flex flex-col drop-shadow-lg border-2 border-gray-200 space-x-2 fixed bg-white mt-4 rounded p-2 w-40 right-2">
        {loading ? (
          <div className="flex flex-col items-center justify-center">
            <div className="text-center">
              <Loading />
            </div>
          </div>
        ) : (
          <div>
            <button className="flex items-center space-x-2" onClick={() => router.push('/listing/messages')}>
              <p className="text-m">Messages</p>
            </button>
            <button className="flex items-center space-x-2 mt-3" onClick={() => router.push('/listing/view')}>
              <p className="text-m">My Listings</p>
            </button>
            <button className="flex items-center space-x-2 mt-3" onClick={() => router.push('/listing/create')}>
              <p className="text-m">List my Car</p>
            </button>
            <button className="flex items-center space-x-2 mt-3" onClick={signOut}>
              <p className="text-m">Log out</p>
            </button>
          </div>
        )}
      </div>
    );
  } else {
    body = (
      <div className="flex flex-col drop-shadow-lg border-2 border-gray-200 space-x-2 fixed bg-white mt-4 rounded p-2 w-40 right-2">
        <button className="flex items-center space-x-2 ml-2" onClick={() => router.push('/signin')}>
          <p className="text-m">Sign in</p>
        </button>
        <button className="flex items-center space-x-2 mt-3" onClick={() => router.push('/signup')}>
          <p className="text-m">Sign up</p>
        </button>
      </div>
    );
  }

  return (
    <div>
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB6Q90sn5X-YQ6yZo5WlSSDuD8xfMMazuE&libraries=places" />
      <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md py-2 px-5 md:px-10">
        {/* Left */}
        <div onClick={() => router.push('/')} className="relative flex items-center h-10 cursor-pointer my-auto -ml-10">
          <Image src={require('../assets/adaptive-icon.png')} alt="Icon" width={200} height={200} />
        </div>

        {/* Middle */}
        <div className="invisible sm:visible">
          <SearchBar />
        </div>

        {/* Right */}
        <div className="flex items-center space-x-4 justify-end text-gray-500">
          <div>
            <button onClick={toggleLoginOptions} className="flex items-center space-x-2 border-2 p-2 rounded-full">
              <MenuIcon className="h-6" />
              <UserCircleIcon className="h-6" />
            </button>
            {showloginOptions && body}
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
