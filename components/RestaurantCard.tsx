import IconChatBubble from './IconChatBubble';
import Image from 'next/image'
import RestaurantLink from './RestaurantLink'
import styles from './RestaurantCard.module.scss'
import PrimaryButton from './PrimaryButton'

type RestaurantCardProps =  {
    id:string
    slug:string
    name:string
    photo:string
    address:{street:string,locality:string,postalCode:string}
    averagePrice:{amount:number,currency:string}
    aggregateRatings:{ratingValue?:number,reviewCount?:number}
    offer?:string
  
  } 
const RestaurantCard  = ({id,slug,name,photo,address,averagePrice,aggregateRatings,offer}:RestaurantCardProps)=>{

    return <div  className={styles.restaurant_card} >
       <RestaurantLink restaurantID={id} restaurantSlug={slug}>
         <div className={styles.restaurant_image_container}>
         <Image src={photo} alt={name} width="304" height="168" className={styles.restaurant_image}/>
         </div>
     
       <div className={styles.restaurant_content}>
         <div className={styles.restaurant_info}>
           <p className={styles.restaurant_name}>{name}</p>
           <p >{address.street}</p>
           <p>{address.postalCode} {address.locality}</p>
           <p>{averagePrice.currency === 'EUR'? '\u20AC':averagePrice.currency}{averagePrice.amount} average price</p>
         </div>
         <div className={styles.restaurant_rating}>
           <p className={styles.restaurant_rating_number}>{aggregateRatings.ratingValue ?? ''}</p>
         <div className={styles.restaurant_reviews}>
           {aggregateRatings?.reviewCount ?<><IconChatBubble/>
           <p>{aggregateRatings.reviewCount}</p></>:null}
         </div>
       </div>

     </div>
     </RestaurantLink>

     <PrimaryButton text={offer? `book up to ${offer}`:`book`}/>
   
     
   </div>
   
   }

   export default RestaurantCard