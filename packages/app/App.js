import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import * as React from 'react';
import { Platform } from 'react-native';
import Navigator from './src/navigation/Navigator';

export default class App extends React.PureComponent {
  render() {
    const host = Platform.OS === 'ios' ? 'http://localhost:4000/graphql' : 'http://10.0.2.2:4000/graphql';
    const client = new ApolloClient({
      link: new HttpLink({
        uri: host
      }),
      cache: new InMemoryCache()
    });
    return (
      <ApolloProvider client={client}>
        <Navigator />
      </ApolloProvider>
    );
  }
}
