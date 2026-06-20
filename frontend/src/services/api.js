import axios from 'axios';

// Teammate ka backend URL yahan aayega (abhi placeholder hai)
const API_BASE_URL = 'http://localhost:5000';

export async function getCreatorScores() {
  const response = await axios.get(`${API_BASE_URL}/api/classify`);
  return response.data;
}