import styles from "../../styles/Home.module.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import LogInForm from "./LogInForm";
import CreateAccountForm from "./CreateAccountForm";

export default function Nav(props) {
  return (
    <nav className={styles.navstyle}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={styles.icon}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
      </svg>
      <h1 className={styles.title}>House Swiper</h1>
      <div className={styles.buttonContainer}>
        <Popup
          trigger={<button className={styles.buttons}>Create account</button>}
          modal="true"
        >
          <CreateAccountForm />
        </Popup>
        <Popup
          trigger={<button className={styles.buttons}>Log in</button>}
          modal="true"
        >
          <LogInForm lat={props.lat} long={props.long} />
        </Popup>
      </div>
    </nav>
  );
}
