import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Nav from '../components/index/Nav'
import HomeImage from '../components/index/homeImage'
import { useEffect, useState } from 'react'

export default function Home() {
  
  return (
    <div classname = {styles.home}>
      <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0"/>
      <Nav />
      <HomeImage src = "/houseSwiperHomePagePic.JPG" />
    </div>
  )
}