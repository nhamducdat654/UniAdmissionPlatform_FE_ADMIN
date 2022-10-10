import { CREATE_TAGS } from '../constants/Endpoints/CreateTagEndPoint';
import { CallAPI } from './axiosBase';

export const CreateTag = (data) => CallAPI(CREATE_TAGS, 'post', data);
