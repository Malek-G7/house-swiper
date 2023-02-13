import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios"
import styles from "./chats.module.css"
export default function ChatPage() {
    const router = useRouter();
    const userID = router.query.userID
    const [messages, setMesagges] = useState([])
    const [flag, setFlag] = useState(true)
    const [chatboxContent, setChatBoxContent] = useState("")

    const texts = ["dsefwefwe", "jiosdjciosjfco", "sdhiosfhoi"]

    function settingMessages(data) {
        return (
            <ul className={styles.list}>
                {data.map((messageContent, index) => (
                    <li>
                        <div>{messageContent.from} : {messageContent.message}</div>
                        <div></div>
                    </li>))}
            </ul>
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
        }, 1000);
        // setMesagges(settingMessages(texts))
    }, [])

    async function sendMessageHandler(event) {
        event.preventDefault()
        const response = await axios.post("http://localhost:5000/messaging/sendChat", { talkingTo: userID, message: chatboxContent }, { withCredentials: true }, { headers: { 'Content-Type': 'application/json' } })
        console.log(response)
    }
    return (

        <div>
            <h1>you are talking to {userID}</h1>
            <div>{messages}</div>
            <div>
                <div id="message-container"></div>
                <form id="send-container" onSubmit={sendMessageHandler}>
                    <input type="text" id="message-input" value={chatboxContent} onChange={(newText) => {
                        setChatBoxContent(newText.target.value)
                    }}></input>
                    <button type="submit" id="send-button">Send</button>
                </form>
            </div>
        </div>)
}