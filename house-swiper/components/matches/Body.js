import { useState, useEffect} from "react"
import axios from "axios"
import styles from "./match.module.css"
import Match from "./Match"
import { useRouter } from 'next/router'

export default function Body(){
    const [profiles, setProfiles] = useState([]);
    const [updateMatches,setUpdateMatches] = useState(true);
    const router = useRouter()

    function buttonHandler(){
        router.push("/mainpage")
    }

    useEffect( () => { 
        async function fetchData() {
            try {
            const response = await axios.get("http://localhost:5000/profiles/matches",{ withCredentials: true }, { headers: {'Content-Type': "application/json"}})     
            const data = await response.data
            console.log(data)
            setProfiles(settingProfiles(data))
            }  catch (e) {
                console.log("Error", e.stack);
                console.log("Error", e.name);
                console.log("Error", e.message);
              }
        }
        fetchData();
    }, [updateMatches]);
   
    function settingProfiles (data) {
        return (
            <ul className={styles.list}>
                {data.map((person,index) => (
                 <Match
                    key = {index} name={person.username ? person.username : "Name missing"}
                    description={person.description ? person.description : "description missing"} 
                    age={person.age ? person.age : "age missing"}
                    email={person.email ? person.email : "email missing"}
                    gender={person.gender ? person.gender : "gender missing"}
                    occupation = {person.occupation ? person.occupation : "occupation missing"}
                    purpose = {person.purpose? person.purpose : "N/A"}
                    image = {person.image ? person.image : "/room7.jpg"}
                    unmatchHandler = { async ()=> {
                        const res = await await axios.patch("http://localhost:5000/matching/unmatch/",{username:person.username},{withCredentials:true},{ headers: {'Content-Type': "application/json"}})
                        if(res.data == "success"){
                            setUpdateMatches(prev => !prev)
                        }
                    }}
          /> ))}</ul>
        )
    }
            
    return(
        <div>
           <div>
                {profiles}
            </div>
            <div className = {styles.editButton}>
                <button className = {styles.buttons} onClick = {buttonHandler} >go back to swiping !</button>
            </div>
        </div>
    )
    }