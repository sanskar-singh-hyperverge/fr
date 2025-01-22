import axios from 'axios';

const API_BASE_URLS = {
  movie: 'http://localhost:3002/api/movies',
  theater: 'http://localhost:3003/api',
  booking: 'http://localhost:3004/api/bookings',
};

export const apiClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getMoviesByStatus = async (status: string) => {
    console.log("daksh");
  return apiClient.get(`${API_BASE_URLS.movie}/status/${status}`);
};

export const getTheatersByMovie = async (movieId: string) => {
  return apiClient.get(`${API_BASE_URLS.theater}/movies/${movieId}/theaters`);
};

export const bookSeats = async (data: { showId: string; seatIds: string[]; userId: string; isChild: boolean[] }) => {
  return apiClient.post(`${API_BASE_URLS.booking}`, data);
};

export const lockSeats = async (data: { showId: string; seatIds: string[]; userId: string }) => {
  return apiClient.post(`${API_BASE_URLS.booking}/lock`, data);
};

export const releaseSeats = async (data: { showId: string; seatIds: string[] }) => {
  return apiClient.post(`${API_BASE_URLS.booking}/release`, data);
};
