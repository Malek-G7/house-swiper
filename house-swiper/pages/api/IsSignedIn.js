import axios from 'axios';

export default async (req, res) => {
  try {
    const response = await axios.get(`http://127.0.0.1:5000/profiles/isSignedIn`, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' }
    });
    console.log("this is from issignedin" + response.data)
    res.status(200).json(response.data);
  } catch (error) {
    res.status(401).json("errorsssssssssssssssss");
  }
};