import styles from "./ProfileDetails.module.css"
import Image from 'next/image'

export default function ProfileDetails(props){
    return(
        <div className = {styles.container}>
            <div>
                <p>Image: {props.img}</p>
                <Image src = "/houseSwiperHomePagePic.JPG" width = "500px" height= "500px"></Image>
                <button>edit image</button>
            </div>
            <div>
                <p>Description: {props.description}</p>
                <button>edit description</button>
            </div>
        </div>
    )


}