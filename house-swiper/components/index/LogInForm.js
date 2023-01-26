import styles from "../../styles/forms.module.css"
import { useState } from "react"
import { useRouter } from 'next/router'

export default function LogInForm() {

    const router = useRouter()
    
    const [inputValues, setInputValues] = useState({
        username: "",
        password: ""
    });

    const logInData = {
        username: inputValues.username,
        password: inputValues.password
    }

    async function logInHandler(event) {
        event.preventDefault()
         try {
            const response = await fetch("/api/Login", {
                credentials: 'include',
                method : "POST",
                 body : JSON.stringify(logInData),
                 headers : {
                     "content-type" : "application/json"
                 }
            })    
        router.push("/mainpage") 
         } catch (error) {
           alert(error)  
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