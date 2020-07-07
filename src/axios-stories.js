import axios from 'axios';
import { config } from './components/FirebaseService/FirebaseService';

const instance = axios.create({
    baseURL: 'https://limi-46e7d.firebaseio.com/'
});
// instance.defaults.headers.common['Authorization'] = config.apiKey;
export default instance;