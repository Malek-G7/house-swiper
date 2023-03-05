import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Nav from '../components/index/Nav'
import HomeImage from '../components/index/homeImage'
import { useEffect, useState } from 'react'

export default function Home() {
  const [latitude,setLat] = useState()
  const [longitude,setLong] = useState()

  useEffect(()=>{
      if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(function(position) {
          setLat(position.coords.latitude)
          setLong(position.coords.longitude)
     });
    }    
  },[])
  
  return (
    <div >
      <Nav lat = {latitude}  long = {longitude} />
      <HomeImage src = "/houseSwiperHomePagePic.JPG" />
    </div>
  )
}