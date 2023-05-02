import axios from "axios";

export default async function handler(req, res) {
  try {
    const response = await axios.post(
      `http://localhost:5000/profiles/setLocationFilter`,
      req.body,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.data;
    res.status(200).json(data);
  } catch (e) {
    console.log("Error", e.stack);
    console.log("Error", e.name);
    console.log("Error", e.message);
    res.status(500).send(e.message);
  }
}
