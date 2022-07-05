import styles from './CityCard.module.scss'
import Link from 'next/link'
import Image from 'next/image'

type CityCardProps =  {id:string,name:string,photo:string} ;

 const CityCard  = ({id,name,photo}:CityCardProps)=>{
  
    return  <div  className={styles.city_card}  >
     <Link href={`${id}`} >
    <a className={styles.city_card_link}>
   <p className={styles.city_card_title}>{name}</p>
  <div className={styles.city_card_gradient}/>
 <Image  src={photo} alt={name} width='304' height='228' className={styles.city_card_image}/>
 </a>
 </Link> 
 </div>
 
 
 }

 export default CityCard
