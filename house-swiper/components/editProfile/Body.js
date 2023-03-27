import axios from "axios"
import { set } from "mongoose"
import { useEffect, useState } from "react"
import styles from "./Body.module.css"
import ProfileDetails from "./ProfileDetails"

export default function Body(){

const [image,setImage] = useState(0)
const [description,setDescription] = useState(0)

const getData = async () => {
    try {
        const res = await axios.get("http://localhost:5000/profiles/getEditProfileDetails",{ withCredentials: true },
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
},[])

return(
    <div className = {styles.container}>
        <ProfileDetails img = {image} desc = {description} ></ProfileDetails>
    </div>
)

}