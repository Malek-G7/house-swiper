import styles from "./Body.module.css"
import profileDummyData from "./profiledummydata"
import cardDummyData from "./cardDummyData"
import Card from "./Card.js"
import EndCard  from "./EndCard.js"
import { useState, useEffect,useRef } from "react"
import { useRouter } from 'next/router'

export default function Body(props) {

    const [cardIterator,setCardIterator] = useState(0)
    const [profiles, setProfiles] = useState([]);
    const router = useRouter()
    const [cards, setCards] = useState([]);
    
    // const cards = cardDummyData.map((e) => {
    //     return <Card description={e.description} img = {e.img} handleClick = {() => setCardIterator(cardIterator + 1)} ></Card>
    // })

    function editProfileHandler(){
        router.push("./editProfile")
    }

    useEffect( () => { 
        async function fetchData() {
            try {
                const response = await fetch("/api/GetProfiles", {
                    method : "GET",
                })   
            const data = await response.json()
            console.log(data)
             setCards(data.map((person,index) => {
                return <Card
                        key = {index} name={person.name ? person.name : "Name missing"}
                        description={person.description ? person.description : "description missing"} 
                        age={person.age ? person.age : "age missing"}
                        email={person.email ? person.email : "email missing"}
                        gender={person.gender ? person.gender : "gender missing"}
                        occupation = {person.occupation ? person.occupation : "occupation missing"}
                        image = {person.image ? person.image : "/room7.jpg"}
                        handleClick = {() => { 
                            setCardIterator((prevState) => prevState+1) ;
                        }}></Card>
             }))
            }  catch (e) {
                console.log("Error", e.stack);
                console.log("Error", e.name);
                console.log("Error", e.message);
              }
        }
        fetchData();
    }, []);

    return (
        <div className={styles.container}>
            <div className = {styles.profile}>
                <div>
                    <h1>{profileDummyData.title}</h1>
                    <h2>{profileDummyData.description}</h2>
                    <p>Name : {profileDummyData.name}</p>
                    <p>Age : {profileDummyData.age}</p>
                </div>
                <div className = {styles.editButton}>
                    <button className = {styles.buttons} onClick ={editProfileHandler}>edit profile</button>
                </div>
            </div>
            <div className={styles.cards}>
                {cardIterator < cards.length  ? cards [cardIterator] : <EndCard></EndCard> }
            </div>
        </div>
    )
}