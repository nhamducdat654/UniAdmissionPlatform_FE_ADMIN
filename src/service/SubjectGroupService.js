import {
  CREATE_SUBJECT_GROUP,
  DELETE_SUBJECT_GROUP,
  GET_LIST_SUBJECT_GROUP,
  UPDATE_SUBJECT_GROUP
} from '../constants/Endpoints/SubjectGroupEndpoint';
import { CallAPI } from './axiosBase';

export const getListSubjectGroup = (data) => CallAPI(GET_LIST_SUBJECT_GROUP, 'get', '', data);
export const createSubjectGroup = (data) => CallAPI(CREATE_SUBJECT_GROUP, 'post', data);
export const updateSubjectGroup = (data) => CallAPI(`${UPDATE_SUBJECT_GROUP}/${data.id}`, 'put', data.data);
export const deleteSubjectGroup = (data) => CallAPI(`${DELETE_SUBJECT_GROUP}/${data}`, 'delete', data);
