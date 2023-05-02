import axios from 'axios';

export default async function handler(req, res) {
  const { talkingTo, message } = req.body;
  try {
    const response = await axios.post(`http://localhost:5000/messaging/sendChat`, { talkingTo, message }, { withCredentials: true }, { headers: { 'Content-Type': 'application/json' } })
    console.log(response);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
}
