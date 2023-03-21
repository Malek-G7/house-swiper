import '../styles/globals.css'

import { useContext ,useState, useEffect } from 'react'
import { LocationContext } from '../store/location-context' 

function MyApp({ Component, pageProps }) {
  const [latitude,setLat] = useState("")
  const [longitude,setLong] = useState("")
  
  useEffect(()=>{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position) {
            setLat(position.coords.latitude)
            setLong(position.coords.longitude)
       });
      }    
  },[])

  return  <LocationContext.Provider value = {{latitude, longitude}}>
            <Component {...pageProps} />    
          </LocationContext.Provider>
}

export default MyApp
