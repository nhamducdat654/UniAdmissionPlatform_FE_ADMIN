import {
  CREATE_MAJOR,
  DELETE_MAJOR,
  GET_LIST_MAJOR,
  GET_MAJOR_DETAIL,
  UPDATE_MAJOR
} from '../constants/Endpoints/MajorEndPoint';
import { CallAPI } from './axiosBase';

export const ListMajor = (data) => CallAPI(`${GET_LIST_MAJOR}?page=${data.page}&limit=${data.limit}`, 'get');
export const CreateMajor = (data) => CallAPI(CREATE_MAJOR, 'post', data);
export const MajorDetail = (data) => CallAPI(`${GET_MAJOR_DETAIL}/${data}`, 'get', data);
export const UpdateMajor = (data) => CallAPI(`${UPDATE_MAJOR}/${data.id}`, 'put', data);
export const DeleteMajor = (data) => CallAPI(`${DELETE_MAJOR}/${data}`, 'delete');
