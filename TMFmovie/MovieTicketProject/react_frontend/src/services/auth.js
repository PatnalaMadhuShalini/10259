import api from './api';

export async function login(credentials){
  const res = await api.post('/users/login', credentials);
  return res.data;
}

export async function register(payload){
  const res = await api.post('/users/register', payload);
  return res.data;
}
