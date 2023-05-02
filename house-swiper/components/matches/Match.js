import styles from "./match.module.css";
export default function Match(props) {
  return (
    <li className={styles.profileItem}>
      <div className={styles.profileContainer}>
        <div className={styles.imageContainer}>
          <img className={styles.profilePic} src={props.image}></img>
        </div>
        <div>
          {props.name}, {props.age}
          <br></br>
          <br></br>
          <br></br>
          {props.description}
        </div>
        <div>
          <div className={styles.editButton}>
            <button className={styles.buttons} onClick={props.messageHandler}>
              Message
            </button>
          </div>
          <div className={styles.editButton}>
            <button className={styles.buttons} onClick={props.unmatchHandler}>
              unmatch
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
