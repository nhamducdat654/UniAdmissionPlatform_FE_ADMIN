import { CREATE_HIGH_SCHOOL_PROFILE_ENDPOINT, GET_ALL_FOR_COMBOBOX } from '../constants/Endpoints/HighSchoolEnpoint';
import { CallAPI } from './axiosBase';

export const getAllForCombobox = () => CallAPI(`${GET_ALL_FOR_COMBOBOX}?limit=200`, 'get');
export const createProfile = (data) => CallAPI(`${CREATE_HIGH_SCHOOL_PROFILE_ENDPOINT}`, 'post', data);
