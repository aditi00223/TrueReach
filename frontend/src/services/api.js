import axios from 'axios';

const API_BASE_URL = 'https://truereach-7r5d.onrender.com';

export async function getCreatorScores() {
  const response = await axios.get(`${API_BASE_URL}/api/classify`);
  return response.data.results;
}