import axios from 'axios';

export default async function handler(req, res) {
    try {
      const response = await axios.get(`http://localhost:5000/profiles/getEditProfileDetails`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const profile = response.data;
      res.status(200).json({ profile });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
  