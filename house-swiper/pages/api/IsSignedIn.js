import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get(`http://127.0.0.1:5000/profiles/isSignedIn`, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' }
    });
    console.log("this log is from /api/isSignedIn " + response)
    res.status(200).json(response.data);
  } catch (error) {
    res.status(401).json("401 error from /api/isSignedIn");
  }
};