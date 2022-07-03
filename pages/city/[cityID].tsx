import type { GetServerSideProps, NextPage, } from 'next';
import { gql, useQuery } from '@apollo/client';
import { useMemo ,useState} from 'react';
import styles from './CityID.module.scss'
import IconChevron from '../../components/IconChevron';
import IconChatBubble from '../../components/IconChatBubble';
import Image from 'next/image'
import Link from 'next/link'
import RestaurantLink from '../../components/RestaurantLink'

type CityPageProps = { cityID: string };
type CityCardProps =  {id:string,name:string,photo:string} ;
type RestaurantCardProps =  {
  id:string
  slug:string
  name:string
  photo:string
  address:{street:string,locality:string,postalCode:string}
  averagePrice:{amount:number,currency:string}
  aggregateRatings:{ratingValue:number,reviewCount:number}

} 



const CityCard  = ({id,name,photo}:CityCardProps)=>{
  
  return <Link href={`${id}`}>
    <a>
    <div  className={styles.city_card}  >
  <p className={styles.card_title}>{name}</p>
 <div className={styles.image_gradient}/>
<Image  src={photo} alt={name} layout="fill" objectFit='cover' className={styles.city_image}/>
</div>
</a>
</Link>
}

const RestaurantCard  = ({id,slug,name,photo,address,averagePrice,aggregateRatings}:RestaurantCardProps)=>{

  return <RestaurantLink restaurantID={id} restaurantSlug={slug}>
  <div  className={styles.restaurant_card} >
    <div className={styles.image_container}>
      <Image src={photo} alt={name} layout="fill"  objectFit='cover' className={styles.restaurant_image}/>
    </div>
    <div className={styles.restaurant_content}>
      <div className={styles.restaurant_info}>
        <p>{name}</p>
        <p>{address.street}</p>
        <p>{address.postalCode} {address.locality}</p>
        <p>{averagePrice.currency}{averagePrice.amount} average price</p>
      </div>
      <div className={styles.restaurant_rating}>
        <p>{aggregateRatings.ratingValue}</p>
      <div className={styles.restaurant_reviews}>
        <IconChatBubble/>
        <p>{aggregateRatings.reviewCount}</p>
      </div>
  

    </div>
  </div>
  <button className={styles.restaurant_button}>book up to -30%</button>
  
</div>
</RestaurantLink>
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
  offer: String
 }
 type RestaurantsVars = {cityID:string}

type ListedCities = {id:string;
  name:string;
  photo:string
 }


const CityPage: NextPage<CityPageProps> = (props) => {
  const {cityID} = props
  const {  loading:citiesLoading, error:citiesError,data:citiesData } = useQuery<CitiesData>(GET_CITIES);
  const {  data:restaurantData } = useQuery<RestaurantsData,RestaurantsVars>(GET_RESTAURANTS,{variables:{cityID}})
  const [isCollapsed,setIsCollapsed] = useState(false)
 
function handleCollapse(){
setIsCollapsed(!isCollapsed)
}

const currenCityName = useMemo(() => citiesData?.getCities.find((city) => city.id === cityID)?.name ?? '', [citiesData,cityID]);
const otherCities = useMemo(() => citiesData?.getCities.filter((city) => city.id !== cityID), [citiesData,cityID]);
  return <div>
    <div className={styles.header}>
    <h1 className={styles.title}>{currenCityName}</h1> 
    <button className={isCollapsed? styles.toggle_button_collapsed:styles.toggle_button} onClick={handleCollapse}><p>MODIFY</p><IconChevron /></button>
    </div>
    <div className={isCollapsed?styles.cities_container:styles.cities_container_hidden}>
      {otherCities?.map((city)=>{
      return  <CityCard key={city.id} {...city}/>
      })}
    </div>
    <h1>{`Restaurants in ${currenCityName}`}</h1>
    {restaurantData?.getRestaurants.map((restaurant)=> <RestaurantCard key={restaurant.id} {...restaurant}/>)}
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
