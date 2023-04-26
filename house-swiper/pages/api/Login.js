import axios from "axios";

 export default async function handler(req, res) {
    try {
      const response = await axios.post(`http://127.0.0.1:5000/profiles/login`, req.body, { withCredentials: true , headers: {'Content-Type': "application/json"}});
      console.log("this is from login" + response.data)
      res.status(200).json(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        res.status(401).json({ message: 'The credentials you have entered are incorrect' });
      } else {
        res.status(500).json({ message: 'An error occurred while fetching the data.' });
      }
    }
} 
