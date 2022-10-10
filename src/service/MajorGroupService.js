import {
  CREATE_MAJOR_GROUP,
  DELETE_MAJOR_GROUP,
  GET_LIST_MAJOR_GROUP,
  GET_MAJOR_GROUP,
  UPDATE_MAJOR_GROUP
} from '../constants/Endpoints/MajorGroupEndPoint';
import { CallAPI } from './axiosBase';

export const ListMajorGroupPaging = (data) =>
  CallAPI(`${GET_LIST_MAJOR_GROUP}?page=${data.page}&limit=${data.limit}`, 'get');
export const ListMajorGroup = (data) => CallAPI(GET_LIST_MAJOR_GROUP, 'get', data);
export const CreateMajorGroup = (data) => CallAPI(CREATE_MAJOR_GROUP, 'post', data);
export const MajorGroupDetail = (data) => CallAPI(`${GET_MAJOR_GROUP}/${data}`, 'get', data);
export const UpdateMajorGroup = (data) => CallAPI(`${UPDATE_MAJOR_GROUP}/${data.id}`, 'put', data);
export const DeleteMajorGroup = (data) => CallAPI(`${DELETE_MAJOR_GROUP}/${data}`, 'delete');
