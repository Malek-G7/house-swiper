import axios from 'axios';

export default async function handler(req, res) {
    try {
      const formData = new FormData();
      formData.append('email', req.body.email);
      formData.append('password', req.body.password);
      formData.append('age', req.body.age);
      formData.append('gender', req.body.gender);
      formData.append('occupation', req.body.occupation);
      formData.append('username', req.body.username);
      formData.append('description', req.body.description);
      formData.append('lookingFor', req.body.lookingFor);
      formData.append('lat', req.body.latitude);
      formData.append('long', req.body.longitude);
      formData.append('image', req.body.file);
      const response = await axios.post(`http://localhost:5000/profiles/register`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      res.status(200).json({ message: 'Account created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
  