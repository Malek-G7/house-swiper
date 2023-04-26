import axios from "axios"
import { set } from "mongoose"
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
      const response = await fetch('/api/GetEditProfileDetails');
      const { profile } = await response.json();
      setImage(profile.image);
      setDescription(profile.description);
    } catch (error) {
      console.error(error);
    }
  };
  

useEffect(()=>{
    getData();
},[refresh])

return(
    <div className = {styles.container}>
        <ProfileDetails img = {image} desc = {description} refreshParent = {refreshPage} ></ProfileDetails>
    </div>
)

}