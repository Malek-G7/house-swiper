import styles from "./Body.module.css"
import ProfileDetails from "./ProfileDetails"

export default function Body(){
return(
    <div className = {styles.container}>
        <ProfileDetails></ProfileDetails>
    </div>
)

}