import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function HomeImage(props){
    return(
    <div className={styles.imageContainer}>
        <Image src = {props.src} width = "2000px" height="1000px" />
      </div>   
    )
}