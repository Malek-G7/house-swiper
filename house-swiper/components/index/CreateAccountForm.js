import styles from "../../styles/forms.module.css"
import { useState } from "react"
import { useRouter } from 'next/router'

export default function CreateAccountForm() {

    const router = useRouter()
    
    const [inputValues, setInputValues] = useState({
        email: "",
        password: "",
        name: "",
        gender: "",
        purpose: "",
        age: "",
        occupation: ""
    });

    const accountData = {
        email: inputValues.email,
        password: inputValues.password,
        name: inputValues.name,
        gender: inputValues.gender,
        purpose: inputValues.purpose,
        age: inputValues.age,
        occupation: inputValues.occupation
    }

    function createAccountHandler(event) {
        event.preventDefault()
        console.log(accountData)
        router.push("/mainpage")
    }

    return (
        <div className={styles.container}>
            <form onSubmit={createAccountHandler}>
                <div className={styles.inputWrapper}>
                    <label>Email</label><br></br>
                    <input type="text" value={inputValues.email} onChange={
                        (e) => setInputValues({ ...inputValues, email: e.target.value })
                    }></input>
                </div>
                <div className={styles.inputWrapper}>
                    <label>Password</label><br></br>
                    <input type="password" value={inputValues.password} onChange={
                        (e) => setInputValues({ ...inputValues, password: e.target.value })
                    }></input>
                </div>
                <div className={styles.inputWrapper}>
                    <label>Name</label><br></br>
                    <input type="text" value={inputValues.name} onChange={
                        (e) => setInputValues({ ...inputValues, name: e.target.value })
                    }></input>
                </div>
                <div className={styles.inputWrapper}>
                    <label>What brings you here :D </label><br></br>
                    <select name="reason" id="reason" value={inputValues.purpose} onChange={
                        (e) => setInputValues({ ...inputValues, purpose: e.target.value })
                    }>
                        <option>Select an option</option>
                        <option value="looking">I am looking for a house or room</option>
                        <option value="leasing">I have a house or room I want to rent</option>
                    </select>
                </div>
                <div className={styles.inputWrapper}>
                    <label>Gender</label><br></br>
                    <select name="gender" id="gender" value={inputValues.gender} onChange={
                        (e) => setInputValues({ ...inputValues, gender: e.target.value })
                    }>
                        <option>Select your gender</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </select>
                </div>
                <div className={styles.inputWrapper}>
                    <label>Occupation</label><br></br>
                    <select name="occupation" id="occupation" value={inputValues.occupation} onChange={
                        (e) => setInputValues({ ...inputValues, occupation: e.target.value })
                    }>
                        <option>Select an option</option>
                        <option value="Student">Student</option>
                        <option value="Worker">Working Professional</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className={styles.inputWrapper}>
                    <label>Age</label><br></br>
                    <input type="number" value={inputValues.age} onChange={
                        (e) => setInputValues({ ...inputValues, age: e.target.value })
                    }></input>
                </div>
                <div className={styles.inputWrapper}>
                    <button>Create Account</button>
                </div>
            </form>
        </div>
    )
}