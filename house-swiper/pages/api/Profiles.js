import axios from "axios";

export default async function handler(req, res) {
  try {
    console.log("im in profiles")
    const response = await axios.get(
      `http://127.0.0.1:5000/profiles/`,
      { withCredentials: true ,
       headers: { "Content-Type": "application/json" } }
    );
    const data = await response.data;
    console.log("this is from profiles" + response.data)
    res.status(200).json(data);
  } catch (e) {
    console.log("Error is", e.message);
    res.status(500).send(e.message);
  }
}
