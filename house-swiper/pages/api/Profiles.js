import axios from "axios";

export default async function handler(req, res) {
  try {
    const response = await axios.get(
      `http://127.0.0.1:5000/profiles/`,
      { withCredentials: true ,
       headers: { "Content-Type": "application/json" } }
    );
    const data = await response.data;
    console.log("this log is from /api/profiles" + response.data)
    res.status(200).json(data);
  } catch (e) {
    console.log("Error from /api/Profile is", e.message);
    res.status(401).send(e.message);
  }
}
