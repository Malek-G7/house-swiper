import styles from "../styles/forms.module.css"

export default function CreateAccountForm(){
    function createAccountHandler(event){
        event.preventDefault()
        alert("Create account form submitted")
    }
    return(
        <div className={styles.container}>
        <form onSubmit = {createAccountHandler}>
        <div className={styles.inputWrapper}>
                <label>Email</label><br></br>
                <input type ="text"></input>
            </div>
            <div className={styles.inputWrapper}>
                <label>Password</label><br></br>
                <input type ="password"></input>
            </div>
            <div className={styles.inputWrapper}>
               <label>What brings you here :D </label><br></br>
               <select name="reason" id="reason">
                    <option>Select an option</option>
                    <option value="looking">I am looking for a house or room</option>
                    <option value="leasing">I have a house or room I want to rent</option>
                </select>
            </div>
            <div className={styles.inputWrapper}>
               <label>Gender</label><br></br>
               <select name="gender" id="gender">
                    <option>Select your gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                </select>
            </div>
            <div className={styles.inputWrapper}>
               <label>Occupation</label><br></br>
               <select name="occupation" id="occupation">
                    <option>Select an option</option>
                    <option value="Student">Student</option>
                    <option value="Worker">Working Professional</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div className={styles.inputWrapper}>
                <label>Age</label><br></br>
                <input type ="number"></input>
            </div>
            <div className={styles.inputWrapper}>
                <button>Create Account</button>
            </div>
        </form>  
    </div>
    )
}