import Head from 'next/head';
import Script from 'next/script';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LargeCard from '../components/LargeCard';
import MediumCard from '../components/MediumCard';
import SmallCard from '../components/SmallCard';

export default function Home({ exploreData, cardsData }) {
  return (
    <div className="">
      <Head>
        <title>Cubu</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Script src="path/to/dist/feather.js" />
      <div className="w-full fixed z-50">
        <Header />
      </div>
      <Banner />

      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {exploreData?.map(item => (
              <SmallCard key={item.img} img={item.img} distance={item.distance} location={item.location} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>
          <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3">
            {cardsData?.map(item => (
              <MediumCard key={item.img} img={item.img} title={item.title} />
            ))}
          </div>
        </section>

        <LargeCard
          img="https://www.tarasportrafting.com/sites/default/files/styles/colorbox_full/public/jeep-safari-gallery-1.jpg?itok=d2TlQFLi"
          title="The Greatest Outdoors"
          description="Wishlists curated by Cubu"
          buttonText="Get Inspired"
        />
      </main>

      <Footer />
    </div>
  );
}
