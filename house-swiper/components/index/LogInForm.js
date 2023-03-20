import styles from "../../styles/forms.module.css"
import { useContext, useState } from "react"
import { useRouter } from 'next/router'
import axios from "axios"
import { LocationContext } from "../../store/location-context"

export default function LogInForm() {
    const router = useRouter()
    const {latitude,longitude} = useContext(LocationContext)
    const [inputValues, setInputValues] = useState({
        username: "",
        password: ""
    });

    const logInData = {
        username: inputValues.username,
        password: inputValues.password,
        lat : latitude,
        long : longitude
    }

    async function logInHandler(event) {
        event.preventDefault()
        //  try {
        //     const response = await fetch("/api/Login", {
        //         credentials: 'include',
        //         method : "POST",
        //          body : JSON.stringify(logInData),
        //          headers : {
        //              "content-type" : "application/json"
        //          }
        //     })    
        // router.push("/mainpage") 
        //  } catch (error) {
        //    alert(error)  
        //  }
        await axios.post("http://localhost:5000/profiles/login", logInData,{ withCredentials: true }, { headers: {'Content-Type': "application/json"}})
        router.push("/mainpage") 
    }

    return (
        <div className={styles.container}>
            <form onSubmit={logInHandler}>
                <div className={styles.inputWrapper}>
                    <label>Username</label><br></br>
                    <input type="text" value={inputValues.username} onChange={
                        (e) => setInputValues({ ...inputValues, username: e.target.value })
                    }></input>
                </div>
                <div className={styles.inputWrapper}>
                    <label>Password </label><br></br>
                    <input type="password" value={inputValues.password} onChange={
                        (e) => setInputValues({ ...inputValues, password: e.target.value })
                    }></input>
                </div>
                <div className={styles.inputWrapper}>
                    <button className = {styles.buttons}>Log In</button>
                </div>
            </form>
        </div>
    )
}