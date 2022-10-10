import { CREATE_UNIVERSITY_PROFILE_ENDPOINT, GET_aLL_FOR_COMBOBOX } from '../constants/Endpoints/UniversityEndpoint';
import { CallAPI } from './axiosBase';

export const getAllForCombobox = () => CallAPI(`${GET_aLL_FOR_COMBOBOX}?limit=200`, 'get');
export const createProfile = (data) => CallAPI(`${CREATE_UNIVERSITY_PROFILE_ENDPOINT}`, 'post', data);
