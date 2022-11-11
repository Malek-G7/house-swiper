import styles from "./Body.module.css"
import profileDummyData from "./profiledummydata"
import cardDummyData from "./cardDummyData"
import Card from "./Card.js"
import EndCard  from "./EndCard.js"
import { useState } from "react"
import { useRouter } from 'next/router'

export default function Body() {

    const [cardIterator,setCardIterator] = useState(0)
    const router = useRouter()
    
    const cards = cardDummyData.map((e) => {
        return <Card description={e.description} img = {e.img} handleClick = {() => setCardIterator(cardIterator + 1)} ></Card>
    })

    function editProfileHandler(){
        router.push("./editProfile")
    }

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