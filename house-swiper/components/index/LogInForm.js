import styles from "../../styles/forms.module.css"
import { useContext, useState } from "react"
import { useRouter } from 'next/router'
import axios from "axios"
import { LocationContext } from "../../store/location-context"
import swal from "sweetalert";

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
        try {
          let response = await fetch('/api/Login', {
            method: 'POST',
            body: JSON.stringify(logInData),
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          })
          response = await response.json()
          console.log('JSON.stringify(resp from login form): ' + JSON.stringify(response))
          router.push("/");
        } catch (error) {
          if (error.response && error.response.status === 401) {
            swal("***the credentials you have entered are incorrect***")
          } else {
            swal('An error occurred while fetching the data.')
          }
        }
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