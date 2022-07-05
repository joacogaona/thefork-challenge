import type { GetServerSideProps, NextPage, } from 'next';
import { gql, useQuery } from '@apollo/client';
import React,{ useMemo ,useState} from 'react';
import styles from './CityID.module.scss'
import CityCard from '../../components/CityCard'
import RestaurantCard from '../../components/RestaurantCard'
import GhostButton from '../../components/GhostButton'


type CityPageProps = { cityID: string };
type CitiesData = {getCities:ListedCities[]}
type RestaurantsData = {getRestaurants:ListedRestaurants[]}
type ListedRestaurants = { id: string
  slug: string
  name: string
  photo: string
  address: {
    street:string
    postalCode: string
    locality: string
    country: string
  }
  averagePrice: {amount:number, currency: string}
  aggregateRatings: {ratingValue:number, reviewCount: number}
  offer: string
 }
 type RestaurantsVars = {cityID:string}

type ListedCities = {id:string;
  name:string;
  photo:string
 }

 const GET_CITIES = gql`
  {
    getCities{
      id
      name
      photo
    }
  }
`;

const GET_RESTAURANTS = gql`
query GetRestaurants($cityID:ID!) { 
    getRestaurants(cityID:$cityID){
      id
      slug
      name
      photo
      address{
        street
        postalCode
        locality
        country
      }
      averagePrice{
        amount
        currency
      }
      aggregateRatings{
        ratingValue
        reviewCount
      }
      offer
    }
  }
`;

// const RestaurantsSection=({ restaurantData,currenCityName }) =>{
//   console.count('list')
//    return <div className={styles.restaurant_section}>
//    <h1 className={styles.restaurant_section_title}>{`Restaurants in ${currenCityName}`}</h1>
//    <div className={styles.restaurant_content_section}>
//    {restaurantData?.getRestaurants.map((restaurant)=> <RestaurantCard key={restaurant.id} {...restaurant}/>)}
//    </div>
//    </div>
//  }
//  const MemoizedRestaurantsSection = React.memo(RestaurantsSection)

const CityPage: NextPage<CityPageProps> = (props) => {
  const {cityID} = props
  const {  loading:citiesLoading, error:citiesError,data:citiesData } = useQuery<CitiesData>(GET_CITIES);
  const {  data:restaurantData } = useQuery<RestaurantsData,RestaurantsVars>(GET_RESTAURANTS,{variables:{cityID}})
  const [isCollapsed,setIsCollapsed] = useState(true)
 
function handleCollapse(){
setIsCollapsed(!isCollapsed)
}

const currenCityName = useMemo(() => citiesData?.getCities.find((city) => city.id === cityID)?.name ?? '', [citiesData,cityID]);
const otherCities = useMemo(() => citiesData?.getCities.filter((city) => city.id !== cityID), [citiesData,cityID]);

  return <div className={styles.main_body}>
    <div className={styles.title}>
    <h1 className={styles.city_name}>{currenCityName}</h1> 
      <GhostButton isCollapsed={isCollapsed} handleClick={handleCollapse} />
    </div>
    <div className={isCollapsed?styles.cities_section_collapsed:styles.cities_section}>
      {otherCities?.map((city)=>{
      return  <CityCard key={city.id} {...city} />
      })}
    </div>
    <div className={styles.restaurant_section}>
    <h1 className={styles.restaurant_section_title}>{`Restaurants in ${currenCityName}`}</h1>
    <div className={styles.restaurant_content_section}>
    {restaurantData?.getRestaurants.map((restaurant)=> <RestaurantCard key={restaurant.id} {...restaurant}/>)}
    </div>
    </div>
    {/* <MemoizedRestaurantsSection restaurantData={restaurantData} currenCityName={currenCityName}/> */}
    </div>;
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
