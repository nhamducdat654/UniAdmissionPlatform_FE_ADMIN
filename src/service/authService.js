import { CallAPI } from './axiosBase';
import { LOGIN_BY_FIREBASE_ENDPOINT } from '../constants/Endpoints/AuthEndpoint';

export const loginByFirebase = (data) => CallAPI(LOGIN_BY_FIREBASE_ENDPOINT, 'post', data);
