import axios from 'axios';

export default async function handler(req, res) {
    try {
      await axios.delete(`http://localhost:5000/profiles/logout`, {
        withCredentials: true
      });
      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
  