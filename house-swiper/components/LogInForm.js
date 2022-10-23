import styles from "../styles/forms.module.css"
export default function LogInForm(){

    function logInHandler(event){
        event.preventDefault()
        alert("log in form submitted")
    }

    return(
        <div className={styles.container}>
            <form  onSubmit={logInHandler}>
                <div className={styles.inputWrapper}>
                    <label>Email</label><br></br>
                    <input type ="text"></input>
                </div>
                <div className={styles.inputWrapper}>
                    <label>Password </label><br></br>
                    <input type ="password"></input> 
                </div>
                <div className={styles.inputWrapper}>
                    <button>Log In</button>
                </div>
            </form>  
        </div>
    )
}