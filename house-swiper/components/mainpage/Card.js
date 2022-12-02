import Image from "next/image";
import styles from "./Card.module.css"
import style from '../../styles/Home.module.css'

export default function Card(props) {

    function swipeRightHandler(){
        props.handleClick()
    }

    function swipeLeftHandler(){
        props.handleClick()
    }

    return (
        <div className={styles.container} >
            { <Image className = {styles.img} src = {props.img} width = "850px" height = "650px"></Image> }
            <div className={styles.buttons}>
                <p>
                    {props.name}
                </p>
                <p>
                    {props.age}
                </p>
                <p>
                    {props.description}
                </p>
                <p>
                    {props.email}
                </p>
            </div>
          
            <div className={styles.buttons}>
                <button className={style.buttons} onClick={swipeLeftHandler} >swipe left</button>
                <button className={style.buttons}  onClick={swipeRightHandler} >swipe right</button>
            </div>
        </div>
    )
}