import styles from "./ProfileDetails.module.css"
import body from "./Body.module.css"
import Image from 'next/image'

export default function ProfileDetails(props){
    return(
        <div className = {styles.container}>
            <div>
                <p>Image: {props.img}</p>
                <Image src = "/houseSwiperHomePagePic.JPG" width = "500px" height= "500px"></Image>
                <button className = {body.buttons}>edit image</button>
            </div>
            <div>
                <p>Description: {props.description}</p>
                <button className = {body.buttons}>edit description</button>
            </div>
        </div>
    )


}