import {
  CREATE_SUBJECT,
  DELETE_SUBJECT,
  GET_LIST_SUBJECT,
  UPDATE_SUBJECT
} from '../constants/Endpoints/SubjectEndpoint';
import { CallAPI } from './axiosBase';

export const getListSubject = (data) => CallAPI(GET_LIST_SUBJECT, 'get', '', data);
export const createSubject = (data) => CallAPI(CREATE_SUBJECT, 'post', data);
export const updateSubject = (data) => CallAPI(`${UPDATE_SUBJECT}/${data.id}`, 'put', data.data);
export const deleteSubject = (data) => CallAPI(`${DELETE_SUBJECT}/${data}`, 'delete', data);
