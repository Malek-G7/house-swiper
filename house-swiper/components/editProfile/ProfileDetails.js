import styles from "./ProfileDetails.module.css"
import body from "./Body.module.css"
import Image from 'next/image'
import { useRouter } from "next/router";
import { useState } from "react"
import axios from "axios"

export default function ProfileDetails(props){
    const [file, setFile] = useState()
    const [bio,setBio] = useState("")
    const router = useRouter()

    async function editProfileHandler(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('bio', bio);
        formData.append('image', file);
        try {
          const response = await fetch('/api/SubmitNewProfile', {
            method: 'PATCH',
            body: formData
          });
          if (response.ok) {
            props.refreshParent();
            window.location.reload();
          }
        } catch (error) {
          console.error(error);
        }
      }
      
   
    return(
        <div className = {styles.container}>
            <div>
                <img src = {props.img} width = "500px" height= "500px"></img>
                <br></br>
                <h2>{props.desc}</h2>
            </div>
            <div>
            <form onSubmit = {editProfileHandler}>
            <h1>Upload Image</h1><br></br>
            <input onChange={e => setFile(e.target.files[0])} type="file" accept="image/*" required></input><br></br><br></br>
            <h1>Edit bio</h1><br></br>
            <textarea onChange={(newText)=>{
                setBio(newText.target.value)
            }}></textarea>
            <button className = {body.buttons} >update profile</button>
            </form>
            </div>
        </div>
    )
}