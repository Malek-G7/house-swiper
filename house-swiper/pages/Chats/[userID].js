import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios"
import styles from "./chats.module.css"
import Nav from "/components/matches/Nav.js"

export default function ChatPage() {
    const router = useRouter();
    const userID = router.query.userID
    const [messages, setMesagges] = useState([])
    const [flag, setFlag] = useState(true)
    const [chatboxContent, setChatBoxContent] = useState("")

    const texts = ["dsefwefwe", "jiosdjciosjfco", "sdhiosfhoi"]

    function settingMessages(data) {
        return (
            <div className= {styles.messagesContainer}>
            <ul className={styles.list}>
                {data.map((messageContent, index) => (
                    <li>
                        <div className={styles.messages}>{messageContent.from} : {messageContent.message}</div>
                        <div></div>
                    </li>))}
            </ul>
            </div>          
        )
    }
    useEffect(() => {
        async function fetchData() {
            try {
                const getTexts = await axios.get("http://localhost:5000/messaging/getChats", { withCredentials: true, params: { talkingTo: userID }, headers: { 'Content-Type': "application/json" } })
                const data = await getTexts.data
                console.log(data)
                setMesagges(settingMessages(data.messages))
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
        setInterval(() => {
            setFlag(prev => !prev)
        }, 5000);
        // setMesagges(settingMessages(texts))
    }, [])

    async function sendMessageHandler(event) {
        event.preventDefault()
        if(chatboxContent.length != 0){
            const response = await axios.post("http://localhost:5000/messaging/sendChat", { talkingTo: userID, message: chatboxContent }, { withCredentials: true }, { headers: { 'Content-Type': 'application/json' } })
            console.log(response)
        }        
    }
    return (
        
        <div className={styles.container}>
            <Nav/>
            <div>
            <h1>you are talking to {userID}</h1>
            </div>
            <div>
                {messages}
            </div>
            <div className={styles.chatBox}>
                <div id="message-container"></div>
                <form id="send-container" onSubmit={sendMessageHandler}>
                    <input type="text" className={styles.inputBox} id="message-input" value={chatboxContent} onChange={(newText) => {
                        setChatBoxContent(newText.target.value)
                    }}></input>
                    <button  className={styles.buttons} type="submit" id="send-button">Send</button>
                </form>
            </div>
        </div>)
}