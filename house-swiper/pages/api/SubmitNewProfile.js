import axios from 'axios';

export default async function handler(req, res) {
    try {
      const formData = new FormData();
      formData.append('bio', req.body.bio);
      formData.append('image', req.body.image);
      const response = await axios.patch(`http://localhost:5000/profiles/submitNewProfile`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
  