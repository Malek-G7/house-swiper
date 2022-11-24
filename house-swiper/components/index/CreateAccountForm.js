import styles from "../../styles/forms.module.css"
import { useState } from "react"
import { useRouter } from 'next/router'

export default function CreateAccountForm() {

    const router = useRouter()
    
    const [inputValues, setInputValues] = useState({
        email: "",
        password: "",
        name: "",
        age: "",
        gender: "",
        occupation: "",
        purpose: "",
        description: "",
        img: ""
    });

    const accountData = {
        email: inputValues.email,
        password: inputValues.password,
        name: inputValues.name,
        age: inputValues.age,
        gender: inputValues.gender,
        occupation: inputValues.occupation,
        purpose: inputValues.purpose,
        description: inputValues.description,
        img: inputValues.img
    }

    async function createAccountHandler(event) {
        event.preventDefault()
        try {
            const response = await fetch("../.././pages/api/CreateAccount", {
                method : "POST",
                body : JSON.stringify(accountData),
                headers : {
                    "content-type" : "application/json"
                }
            })   
            let data = await response  
            alert("response says" + JSON.stringify(data) )     
        } catch (error) {
          alert(error)  
        }
     //   router.push("/mainpage")
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
                    <label>Description</label><br></br>
                    <textarea value={inputValues.description} onChange={
                        (e) => setInputValues({ ...inputValues, description: e.target.value })
                    }></textarea>
                </div>
                <div className={styles.inputWrapper}>
                    <label>Upload Image</label><br></br>
                    <input type="file" value={inputValues.img} onChange={
                        (e) => setInputValues({ ...inputValues, img: e.target.value })
                    }></input>
                </div>
                <div className={styles.inputWrapper}>
                    <button className = {styles.buttons}>Create Account</button>
                </div>
            </form>
        </div>
    )
}