import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div >
      <nav className={styles.navstyle}>
        <button className= {styles.buttons} >create account</button>
        <button className= {styles.buttons}>log in</button>
      </nav>
      <div className={styles.imageContainer}>
        <Image src = "/houseSwiperHomePagePic.JPG" width = "2000px" height="1000px" />
      </div>   
    </div>
  )
}