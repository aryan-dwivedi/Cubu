/* eslint-disable react-native/no-inline-styles */
import { gql, useQuery } from '@apollo/client';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import CustomMarker from '../../components/CustomMarker';
import PostMap from '../../components/PostMap';

const QUERY = gql`
  query searchListings($latitude: Float, $longitude: Float, $offset: Int!, $limit: Int!) {
    searchListings(latitude: $latitude, longitude: $longitude, offset: $offset, limit: $limit) {
      id
      make
      model
      year
      pictureUrl
      price
      latitude
      longitude
      description
      features
      owner {
        id
        email
      }
    }
  }
`;

const SearchResultsMap = () => {
  const route = useRoute();
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);
  const width = useWindowDimensions().width;
  const { loading, data } = useQuery(QUERY, {
    variables: {
      latitude: route.params.latitude,
      longitude: route.params.longitude,
      offset: 0,
      limit: 10
    }
  });
  const flatlist = useRef();
  const map = useRef();
  const viewConfig = useRef({ itemVisiblePercentThreshold: 70 });
  const onViewChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const selectedPlace = viewableItems[0].item;
      setSelectedPlaceId(selectedPlace.id);
    }
  });

  useEffect(() => {
    if (!selectedPlaceId || !flatlist) {
      return;
    }
    const index = data.searchListings.findIndex(place => place.id === selectedPlaceId);
    flatlist.current.scrollToIndex({ index });

    const selectedPlace = data.searchListings[index];
    const region = {
      latitude: selectedPlace.latitude,
      longitude: selectedPlace.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    };
    map.current.animateToRegion(region);
  }, [data.searchListings, selectedPlaceId]);

  return (
    <View style={{ width: '100%', height: '100%' }}>
      <MapView
        ref={map}
        style={{ width: '100%', height: '100%' }}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 26.4499,
          longitude: 80.3319,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        {data.searchListings.map(place => (
          <CustomMarker
            latitude={place.latitude}
            longitude={place.longitude}
            key={place.id}
            price={place.price}
            isSelected={place.id === selectedPlaceId}
            onPress={() => setSelectedPlaceId(place.id)}
          />
        ))}
      </MapView>
      <View style={{ position: 'absolute', bottom: 3 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            ref={flatlist}
            data={data.searchListings}
            renderItem={({ item }) => <PostMap post={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={width - 60}
            snapToAlignment={'center'}
            decelerationRate={'fast'}
            viewabilityConfig={viewConfig.current}
            onViewableItemsChanged={onViewChanged.current}
          />
        )}
      </View>
    </View>
  );
};

export default SearchResultsMap;
