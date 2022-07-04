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
  offer:string

} 

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



const CityCard  = ({id,name,photo}:CityCardProps)=>{
  
   return  <div  className={styles.city_card}  >
    <Link href={`${id}`} >
   <a className={styles.city_card_link}>
  <p className={styles.city_card_title}>{name}</p>
 <div className={styles.city_card_gradient}/>
<Image  src={photo} alt={name} layout='fill' objectFit='cover' className={styles.city_card_image}/>
</a>
</Link> 
</div>


}

const RestaurantCard  = ({id,slug,name,photo,address,averagePrice,aggregateRatings,offer}:RestaurantCardProps)=>{

   
 return <div  className={styles.restaurant_card} >
    <RestaurantLink restaurantID={id} restaurantSlug={slug}>
      <Image src={photo} alt={name} width='311' height='168' className={styles.restaurant_image}/>
  
    <div className={styles.restaurant_content}>
      <div className={styles.restaurant_info}>
        <p className={styles.restaurant_name}>{name}</p>
        <p >{address.street}</p>
        <p>{address.postalCode} {address.locality}</p>
        <p>{averagePrice.currency === 'EUR'? '\u20AC':averagePrice.currency}{averagePrice.amount} average price</p>
      </div>
      <div className={styles.restaurant_rating}>
        <p className={styles.restaurant_rating_number}>{aggregateRatings.ratingValue}</p>
      <div className={styles.restaurant_reviews}>
        <IconChatBubble/>
        <p>{aggregateRatings.reviewCount}</p>
      </div>
    </div>
  </div>
  <button className={styles.restaurant_button}>{offer? `book up to ${offer}`:`book`}</button>
  </RestaurantLink>
</div>

}


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
    <button className={isCollapsed? styles.toggle_button_collapsed:styles.toggle_button} onClick={handleCollapse}>
      <p className={styles.toggle_button_text}>modify</p>
      <IconChevron className={styles.toggle_button_icon}/>
      </button>
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
