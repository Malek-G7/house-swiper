
import Nav from '../components/mainpage/Nav'
import Body from '../components/mainpage/Body'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
export default function MainPage(props) {

  const router = useRouter()
  const isSignedIn = async () => {
    try {
        const res = await axios.get(`https://${process.env.SERVER_URI}/profiles/isSignedIn`,{ withCredentials: true },
        { headers: { "Content-Type": "application/json" } })
    } catch (error) {
      router.push("/login")   
    }
}
  useEffect(()=>{
    isSignedIn()
  },[])

  return (
    <div >
      <Nav />
      <Body data = {props.text}/>
    </div>
  )
}
// export async function getServerSideProps() {
//   // Fetch data from external API

//   const res = await fetch(`http://localhost:5000/`)
//   const data = await res.json()

//   // Pass data to the page via props
//   return {
//      props: {
//         text : data.text 
//      } 
//     }
// }