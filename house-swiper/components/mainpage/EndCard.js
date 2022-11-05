import Image from "next/image";
import styles from "./Card.module.css"

export default function EndCard(){
    return (
        <div className={styles.EndCard} >
            <p>
                No more profiles left 
            </p>
        </div>
    )
}