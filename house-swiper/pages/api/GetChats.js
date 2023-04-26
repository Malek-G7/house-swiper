import axios from 'axios';

export default async function handler(req, res) {
  const { talkingTo } = req.query;
  try {
    const getTexts = await axios.get(`http://localhost:5000/messaging/getChats`, { withCredentials: true, params: { talkingTo }, headers: { 'Content-Type': "application/json" } })
    const data = await getTexts.data
    res.status(200).json({ messages: data.messages })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to get chats' })
  }
}
