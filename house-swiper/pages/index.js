import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Nav from '../components/nav'
import HomeImage from '../components/homeImage'

export default function Home() {
  return (
    <div >
      <Nav />
      <HomeImage src = "/houseSwiperHomePagePic.JPG" />
    </div>
  )
}