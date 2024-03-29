import axios from "axios"
import { useEffect, useState} from "react"
import styles from "./Body.module.css"
import ProfileDetails from "./ProfileDetails"

export default function Body(){

const [image,setImage] = useState(0)
const [description,setDescription] = useState(0)
const [refresh,setRefresh] = useState(0)

function refreshPage (){
    setRefresh(refresh + 1 ) 
}
const getData = async () => {
    try {
        const res = await axios.get(`https://${process.env.SERVER_URI}/profiles/getEditProfileDetails`,{ withCredentials: true },
        { headers: { "Content-Type": "application/json" } })
        const profile = res.data
        setImage(profile.image)
        setDescription(profile.description)
    } catch (error) {
        console.log(error)        
    }
}

useEffect(()=>{
    getData();
},[refresh])

return(
    <div className = {styles.container}>
        <ProfileDetails img = {image} desc = {description} refreshParent = {refreshPage} ></ProfileDetails>
    </div>
)

}