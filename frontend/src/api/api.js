import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
const apiPath = (path) => (API_BASE_URL === '/api' ? path.replace(/^\/api/, '') : path);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('desacare_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const getErrorMessage = (error, fallback) => error?.response?.data?.message || fallback;

export const loginAdmin = async (payload) => {
  try {
    const { data } = await api.post(apiPath('/api/auth/login'), payload);
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'Login gagal.'));
  }
};

export const createPengajuan = async (formData) => {
  try {
    const { data } = await api.post(apiPath('/api/pengajuan'), formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'Gagal mengirim pengajuan.'));
  }
};

export const createPengaduan = async (formData) => {
  try {
    const { data } = await api.post(apiPath('/api/pengaduan'), formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'Gagal mengirim pengaduan.'));
  }
};

export const getStatusByTicket = async (kodeTiket) => {
  try {
    const { data } = await api.get(apiPath(`/api/status/${kodeTiket}`));
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'Kode tiket tidak ditemukan.'));
  }
};

export const getAllPengajuan = async () => {
  try {
    const { data } = await api.get(apiPath('/api/pengajuan'));
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'Gagal mengambil data pengajuan.'));
  }
};

export const getAllPengaduan = async () => {
  try {
    const { data } = await api.get(apiPath('/api/pengaduan'));
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'Gagal mengambil data pengaduan.'));
  }
};

export const updatePengajuanStatus = async (id, payload) => {
  try {
    const { data } = await api.put(apiPath(`/api/pengajuan/${id}/status`), payload);
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'Gagal memperbarui status pengajuan.'));
  }
};

export const updatePengaduanStatus = async (id, payload) => {
  try {
    const { data } = await api.put(apiPath(`/api/pengaduan/${id}/status`), payload);
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'Gagal memperbarui status pengaduan.'));
  }
};

export default api;
