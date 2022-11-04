import styles from '../../styles/Home.module.css'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import LogInForm from './LogInForm';
import CreateAccountForm from './CreateAccountForm';

export  default function Nav(){
    
    return (
    <nav className={styles.navstyle}>
        <Popup trigger={<button className= {styles.buttons} >Create account</button>}  modal="true">
            <CreateAccountForm />
        </Popup>
        <Popup trigger={<button className= {styles.buttons}>Log in</button>}  modal="true">
        <LogInForm />
        </Popup>
      </nav>
    )
}