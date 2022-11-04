import styles from "../../styles/forms.module.css"
import { useState } from "react"
import { useRouter } from 'next/router'

export default function LogInForm() {

    const router = useRouter()
    
    const [inputValues, setInputValues] = useState({
        email: "",
        password: ""
    });

    const logInData = {
        email: inputValues.email,
        password: inputValues.password
    }

    function logInHandler(event) {
        event.preventDefault()
        console.log(logInData)
        router.push("/mainpage")
    }

    return (
        <div className={styles.container}>
            <form onSubmit={logInHandler}>
                <div className={styles.inputWrapper}>
                    <label>Email</label><br></br>
                    <input type="text" value={inputValues.email} onChange={
                        (e) => setInputValues({ ...inputValues, email: e.target.value })
                    }></input>
                </div>
                <div className={styles.inputWrapper}>
                    <label>Password </label><br></br>
                    <input type="password" value={inputValues.password} onChange={
                        (e) => setInputValues({ ...inputValues, password: e.target.value })
                    }></input>
                </div>
                <div className={styles.inputWrapper}>
                    <button>Log In</button>
                </div>
            </form>
        </div>
    )
}