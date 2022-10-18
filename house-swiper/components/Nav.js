import styles from '../styles/Home.module.css'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export  default function Nav(){
    return(
    <nav className={styles.navstyle}>
        <Popup trigger={<button className= {styles.buttons} >Create account</button>}  modal="true">
            <div>Create account popup</div>
        </Popup>
        <Popup trigger={<button className= {styles.buttons}>Log in</button>}  modal="true">
            <div>Log  in popup</div>
        </Popup>
      </nav>
    )
}