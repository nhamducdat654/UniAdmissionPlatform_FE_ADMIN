import { CallAPI } from './axiosBase';
import { GET_LIST_TAGS } from '../constants/Endpoints/GetTagEndPoint';

export const ListTags = (data) => CallAPI(`${GET_LIST_TAGS}?page=${data.page}&limit=${data.limit}`, 'get');
