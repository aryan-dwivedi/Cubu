import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import ProgressBar from '@badrap/bar-of-progress';
import Router from 'next/router';
import 'tailwindcss/tailwind.css';

const client = new ApolloClient({
  uri: process.env.API_URL || 'https://cubu-server-nm4j.onrender.com/graphql',
  credentials: 'include',
  cache: new InMemoryCache()
});

const progress = new ProgressBar({
  size: 4,
  color: '#5465FF',
  className: 'z-50',
  delay: 100
});

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
