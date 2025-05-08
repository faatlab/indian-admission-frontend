import axios from 'axios';

export const getProfile = async () => {
  try {
    const res = await axios.get('/api/method/myapp.student.get_profile');
    return res.data.message;
  } catch (err) {
    throw new Error('Unauthorized or failed to fetch profile');
  }
};