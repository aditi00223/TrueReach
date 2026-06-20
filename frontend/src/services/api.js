import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export async function getCreatorScores() {
  const response = await axios.get(`${API_BASE_URL}/api/classify`);
  return response.data.results;
}