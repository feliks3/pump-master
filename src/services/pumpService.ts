import axios from '../api/axiosInstance';
import type { NewPump, Pump } from '../features/pumps/types';

export type PumpQuery = {
  name?: string;
  type?: string;
  status?: string;
  areaBlock?: string;
};

export const getAllPumps = async (query?: PumpQuery) => {
  const response = await axios.get('/pumps', { params: query });
  return response.data;
};

export const getPumpById = async (id: number) => {
  const response = await axios.get(`/pumps/${id}`);
  return response.data;
};

export const createPump = async (pump: NewPump) => {
  const response = await axios.post('/pumps', pump);
  return response.data;
};

export const updatePump = async (id: number, pump: Pump) => {
  const response = await axios.put(`/pumps/${id}`, pump);
  return response.data;
};

export const deletePump = async (id: number) => {
  const response = await axios.delete(`/pumps/${id}`);
  return response.data;
};
