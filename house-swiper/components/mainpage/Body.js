import styles from "./Body.module.css"
import profileDummyData from "./profiledummydata"
import cardDummyData from "./cardDummyData"
import Card from "./Card.js"
import EndCard  from "./EndCard.js"
import { useState } from "react"


export default function Body() {

    const [cardIterator,setCardIterator] = useState(0)
    
    const cards = cardDummyData.map((e) => {
        return <Card description={e.description} img = {e.img} handleClick = {() => setCardIterator(cardIterator + 1)} ></Card>
    })

    return (
        <div className={styles.container}>
            <div className = {styles.profile}>
                <h1>{profileDummyData.title}</h1>
                <h2>{profileDummyData.description}</h2>
                <p>Name : {profileDummyData.name}</p>
                <p>Age : {profileDummyData.age}</p>
            </div>
            <div className={styles.cards}>
                {cardIterator < cards.length  ? cards [cardIterator] : <EndCard></EndCard> }
            </div>
        </div>
    )
}