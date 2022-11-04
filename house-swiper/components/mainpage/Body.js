import styles from "./Body.module.css"
import dummydata from "./dummydata"
import Card from "./Card.js"


export default function Body() {

    const arr = ["first card", "second card", "third card"]
    const a = arr.map((e) => {
        return <Card text={e}></Card>
    })

    return (
        <div className={styles.container}>
            <div>
                <h1>{dummydata.description}</h1>
            </div>
            <div>
                {a}
            </div>
        </div>
    )
}