import axios from "axios";
import { Toast } from 'toastify-react-native';  // chỉ cần import Toast
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from '@env';

const instance = axios.create({
  baseURL: API_URL || 'http://192.168.x.x:1014',
});

// instance.defaults.withCredentials = true;    // cho phép trao đổi cookie giữa client và server

// 👉 Lấy token đúng lúc gửi request
instance.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('jwt');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
  // status 2xx
  return response.data;
}, function (err) {
  const status = err && err.response && err.response.status || 500;
  switch (status) {
    case 401: {
      Toast.error('Vui lòng đăng nhập trước.');
      return err.response.data;
    }
    case 403: {
      Toast.error('Bạn không có quyền truy cập');
      console.log('unexpected error 403');
      return Promise.reject(err);
    }
    case 400: {
      console.log('unexpected error 400');
      return Promise.reject(err);
    }
    case 404: {
      console.log('unexpected error 404');
      return Promise.reject(err);
    }
    case 409: {
      console.log('unexpected error 409');
      return Promise.reject(err);
    }
    case 422: {
      console.log('unexpected error 422');
      return Promise.reject(err);
    }
    default: {
      console.log('unexpected error', err);
      return Promise.reject(err);
    }
  }
});

export default instance;
