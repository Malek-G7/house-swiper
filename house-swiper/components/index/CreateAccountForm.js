import styles from "../../styles/forms.module.css"
import { useState } from "react"
import { useRouter } from 'next/router'
import axios from "axios"

export default function CreateAccountForm() {

    const router = useRouter()
    const [file, setFile] = useState()
    const [inputValues, setInputValues] = useState({
        email: "",
        password: "",
        username: "",
        age: "",
        gender: "",
        occupation: "",
        purpose: "",
        description: "",
    });

    const accountData = {
        email: inputValues.email,
        password: inputValues.password,
        username: inputValues.username,
        age: inputValues.age,
        gender: inputValues.gender,
        occupation: inputValues.occupation,
        purpose: inputValues.purpose,
        description: inputValues.description,
        }

    async function createAccountHandler(event) {
        event.preventDefault()
        axios.defaults.withCredentials = true;
        const formData = new FormData();
        formData.append("email", inputValues.email)
        formData.append("password", inputValues.password)
        formData.append("age", inputValues.age)
        formData.append("gender", inputValues.gender)
        formData.append("occupation", inputValues.occupation)
        formData.append("username", inputValues.username)
        formData.append("decription", inputValues.description)
        formData.append("purpose", inputValues.purpose)
        formData.append("image", file)
        await axios.post("http://localhost:5000/profiles/register", formData, { headers: {'Content-Type': 'multipart/form-data'}})

        // try {
        //     const response = await fetch("/api/CreateAccount", {
        //         method : "POST",
        //         body : JSON.stringify(accountData),
        //         headers : {
        //             "content-type" : "application/json"
        //         }
        //     })      
        // } catch (error) {
        //   alert(error)  
        // }
       // router.push("/mainpage")  
    }

    return (
        <div className={styles.container}>
            <form onSubmit={createAccountHandler}>
                <div className={styles.inputWrapper}>
                    <label>Email</label><br></br>
                    <input type="text" value={inputValues.email} onChange={
                        (e) => setInputValues({ ...inputValues, email: e.target.value })
                    } required></input>
                </div>
                <div className={styles.inputWrapper}>
                    <label>Password</label><br></br>
                    <input type="password" value={inputValues.password} onChange={
                        (e) => setInputValues({ ...inputValues, password: e.target.value })
                    } required></input>
                </div>
                <div className={styles.inputWrapper}>
                    <label>Name</label><br></br>
                    <input type="text" value={inputValues.username} onChange={
                        (e) => setInputValues({ ...inputValues, username: e.target.value })
                    }required></input>
                </div>
                <div className={styles.inputWrapper}>
                    <label>What brings you here :D </label><br></br>
                    <select name="reason" id="reason" value={inputValues.purpose} onChange={
                        (e) => setInputValues({ ...inputValues, purpose: e.target.value })
                    } required>
                        <option>Select an option</option>
                        <option value="looking">I am looking for a house or room</option>
                        <option value="leasing">I have a house or room I want to rent</option>
                    </select>
                </div>
                <div className={styles.inputWrapper}>
                    <label>Gender</label><br></br>
                    <select name="gender" id="gender" value={inputValues.gender} onChange={
                        (e) => setInputValues({ ...inputValues, gender: e.target.value })
                    } required>
                        <option>Select your gender</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </select>
                </div>
                <div className={styles.inputWrapper}>
                    <label>Occupation</label><br></br>
                    <select name="occupation" id="occupation" value={inputValues.occupation} onChange={
                        (e) => setInputValues({ ...inputValues, occupation: e.target.value })
                    } required>
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
                    }required></input>
                </div>
                <div className={styles.inputWrapper}>
                    <label>Description</label><br></br>
                    <textarea value={inputValues.description} onChange={
                        (e) => setInputValues({ ...inputValues, description: e.target.value })
                    }></textarea>
                </div>
                <div className={styles.inputWrapper}>
                    <label>Upload Image</label><br></br>
                    <input onChange={e => setFile(e.target.files[0])} type="file" accept="image/*" required></input>
                </div>
                <div className={styles.inputWrapper}>
                    <button className = {styles.buttons}>Create Account</button>
                </div>
            </form>
        </div>
    )
}
