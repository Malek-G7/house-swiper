import styles from '../styles/Home.module.css'

export  default function Nav(){
    return(
    <nav className={styles.navstyle}>
        <button className= {styles.buttons} >Create account</button>
        <button className= {styles.buttons}>Log in</button>
      </nav>
    )
}