import styles from "./Body.module.css";
import profileDummyData from "./profiledummydata";
import cardDummyData from "./cardDummyData";
import Card from "./Card.js";
import EndCard from "./EndCard.js";
import { useState, useEffect, useRef ,useContext} from "react";
import { useRouter } from "next/router";
import axios from "axios";
import swal from "sweetalert";
import { Slider } from "@mui/material";
import {LocationContext}  from "../../store/location-context";
export default function Body() {
  const [cardIterator, setCardIterator] = useState(0);
  const [profiles, setProfiles] = useState([]);
  const router = useRouter();
  const [cards, setCards] = useState([]);
  const [filter, setFilter] = useState(100);
  const [reload,setReload] = useState(true)
  const {latitude,longitude} = useContext(LocationContext)

  function editProfileHandler() {
    router.push("./editProfile");
  }
  function matchesHandler() {
    router.push("./matches");
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `/api/Profiles`,
          { withCredentials: true ,
           headers: { "Content-Type": "application/json" } }
        );
        const data = await response.data;
        console.log(data);
        setCards(
          data.map((person, index) => {
            const distance = getDistanceFromLatLonInKm(latitude,longitude,person.location.lat,person.location.long)
            return (
              <Card
                key={index}
                name={person.username ? person.username : "Name missing"}
                description={
                  person.description
                    ? person.description
                    : "description missing"
                }
                age={person.age ? person.age : "age missing"}
                email={person.email ? person.email : "email missing"}
                gender={person.gender ? person.gender : "gender missing"}
                occupation={
                  person.occupation ? person.occupation : "occupation missing"
                }
                distance={Math.ceil(distance)}
                image={person.image ? person.image : "/room7.jpg"}
                handleClickRight={async () => {
                  const res = await axios.patch(
                    `/api/LikeProfile`,
                    { username: person.username },
                    { withCredentials: true ,
                      headers: { "Content-Type": "application/json" } }
                  );
                  if (res.data != "no match") {
                    console.log(res);
                    swal("its a match ! you matched with " + res.data);
                  }
                  setCardIterator((prevState) => prevState + 1);
                }}
                handleClickLeft={() => {
                  setCardIterator((prevState) => prevState + 1);
                }}
              ></Card>
            );
          })
        );
      } catch (e) {
        console.log("Error", e.stack);
        console.log("Error", e.name);
        console.log("Error", e.message);
      }
    }
    fetchData();
  }, [reload]);

  async function getLocationValue(e, value) {
    const response = await axios.post(
      "/api/SetLocationFilter",
      { radius: value },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = response.data;
    console.log(data);
    setFilter(value)
    setReload(prev => !prev)
  }
  
  function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }
  return (
    <div className={styles.container}>
            <div className={styles.cards}>
        {cardIterator < cards.length ? (
          cards[cardIterator]
        ) : (
          <EndCard></EndCard>
        )}
      </div>
      <div className={styles.profile}>
        <div style={{ backgroundColor: "#fdf3f1", borderRadius: 30 }}>
          <h1 className={styles.welcome}>Welcome to House Swiper! :) </h1>
          <h2>find your next roommate, house or whatever youre looking for here !</h2>
          <p>at the moment development of the swiping functionality is not yet complete</p>
          <p>Please use the <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class={styles.icon}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg> and <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class={styles.icon}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg> buttons to like or dislike a user</p>
        </div>
        <div style={{ backgroundColor: "#fdf3f1", borderRadius: 30 }}>
          <h2 className={styles.moretext}>Show users within {filter} KM</h2>
          <div>
            <Slider
              defaultValue={100}
              aria-label="Small"
              max={200}
              min={10}
              valueLabelDisplay="auto"
              onChange={getLocationValue}
            />
          </div>
        </div>
        <div style={{ backgroundColor: "#fdf3f1", borderRadius: 30 }}>
          <div className={styles.editButton}>
            <button className={styles.buttons} onClick={editProfileHandler}>
              edit my profile
            </button>
          </div>
          <div className={styles.editButton}>
            <button className={styles.buttons} onClick={matchesHandler}>
              my matches
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
