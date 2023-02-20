import styles from "./match.module.css"
export default function Match(props){
return(
    <li className={styles.profileItem} >
        <div className={styles.profileContainer} >
        <div className={styles.imageContainer}>
                <img className = {styles.profilePic} src = {props.image}></img>
        </div>
        <div className={styles.profileInfoContainer}>
        <div className={styles.textContainer}>
                <div>
                name : {props.name}
                </div>
                <div>
                age : {props.age}
                </div>
            </div>
            <div className={styles.textContainer}>
                <div>
                gender : {props.gender}
                </div>
                <div>
                looking for : {props.purpose}
                </div>
            </div>
            <div className={styles.textContainer}>
                <div>
                description : {props.description}
                </div>
                <div>
                occupation : {props.occupation}
                </div>
            </div>
        </div>
        <div>
        <div className = {styles.editButton}>
            <button className = {styles.buttons} onClick = {props.messageHandler} >Message</button>
        </div>
        <div className = {styles.editButton}>
            <button className = {styles.buttons} onClick = {props.unmatchHandler} >unmatch</button>
        </div>
        </div>
        </div>
    </li>
)
}
