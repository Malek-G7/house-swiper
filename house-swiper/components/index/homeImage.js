import Image from 'next/image'
import styles from '../../styles/Home.module.css'

export default function HomeImage(props){
    return(
    <div className={styles.imageContainer}>
      <img src = {props.src} width = "100%" height="100%" />
    </div>   
    )
}