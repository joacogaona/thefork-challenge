import type { GetServerSideProps, NextPage } from 'next';
import { gql, useQuery } from '@apollo/client';
import React, { useMemo, useState } from 'react';
import styles from './CityID.module.scss';
import CityCard from '../../components/CityCard';
import RestaurantCard from '../../components/RestaurantCard';
import GhostButton from '../../components/GhostButton';

type CityPageProps = { cityID: string };
type CitiesData = { getCities: ListedCities[] };
type RestaurantsData = { getRestaurants: ListedRestaurants[] };
type ListedRestaurants = {
  id: string;
  slug: string;
  name: string;
  photo: string;
  address: {
    street: string;
    postalCode: string;
    locality: string;
    country: string;
  };
  averagePrice: { amount: number; currency: string };
  aggregateRatings: { ratingValue: number; reviewCount: number };
  offer: string;
};
type RestaurantsVars = { cityID: string };

type ListedCities = { id: string; name: string; photo: string };

const GET_CITIES = gql`
  {
    getCities {
      id
      name
      photo
    }
  }
`;

const GET_RESTAURANTS = gql`
  query GetRestaurants($cityID: ID!) {
    getRestaurants(cityID: $cityID) {
      id
      slug
      name
      photo
      address {
        street
        postalCode
        locality
        country
      }
      averagePrice {
        amount
        currency
      }
      aggregateRatings {
        ratingValue
        reviewCount
      }
      offer
    }
  }
`;

const RestaurantList = ({ cityID }: CityPageProps) => {
  const {
    data: restaurantData,
    error,
    loading,
  } = useQuery<RestaurantsData, RestaurantsVars>(GET_RESTAURANTS, {
    variables: { cityID },
  });
  if (error) {
    return (
      <span>An error occur while loading restaurants, please refresh</span>
    );
  }
  return (
    <>
      {loading ? (
        <span>Loading...</span>
      ) : (
        restaurantData?.getRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} {...restaurant} />
        ))
      )}
    </>
  );
};

type CityListProps = { citiesData?: CitiesData; cityID: string };
const CityList = ({ citiesData, cityID }: CityListProps) => {
  const otherCities = useMemo(
    () => citiesData?.getCities.filter((city) => city.id !== cityID),
    [citiesData, cityID]
  );
  return (
    <>
      {otherCities?.map((city) => {
        return <CityCard key={city.id} {...city} />;
      })}
    </>
  );
};
const MemoRestaurantList = React.memo(RestaurantList);
const MemoCityList = React.memo(CityList);

const CityPage: NextPage<CityPageProps> = (props) => {
  const { cityID } = props;
  const [isCollapsed, setIsCollapsed] = useState(true);

  function handleCollapse() {
    setIsCollapsed(!isCollapsed);
  }

  const {
    loading: citiesLoading,
    error: citiesError,
    data: citiesData,
  } = useQuery<CitiesData>(GET_CITIES);

  const currenCityName = useMemo(
    () => citiesData?.getCities.find((city) => city.id === cityID)?.name ?? '',
    [citiesData, cityID]
  );

  if (citiesError) {
    return <span>An error occur while loading the page, please refresh</span>;
  }

  return (
    <div>
      <div className={styles.title}>
        <h1 className={styles.city_name}>{currenCityName}</h1>
        <GhostButton isCollapsed={isCollapsed} handleClick={handleCollapse} />
      </div>
      <div
        className={
          isCollapsed ? styles.cities_section_collapsed : styles.cities_section
        }
      >
        {citiesLoading && !isCollapsed ? (
          <span>Loading...</span>
        ) : (
          <MemoCityList citiesData={citiesData} cityID={cityID} />
        )}
      </div>
      <h1
        className={styles.restaurant_section_title}
      >{`Restaurants in ${currenCityName}`}</h1>
      <div className={styles.restaurant_content_section}>
        <MemoRestaurantList cityID={cityID} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;

  if (typeof query.cityID !== 'string') {
    return {
      notFound: true,
    };
  }

  return {
    props: { cityID: query.cityID },
  };
};

export default CityPage;
