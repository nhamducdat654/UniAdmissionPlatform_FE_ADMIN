import { CallAPI } from './axiosBase';
import { UPDATE_TAGS } from '../constants/Endpoints/EditTagEndPoint';

export const UpdateTag = (data) => CallAPI(`${UPDATE_TAGS}/${data.id}`, 'put', data.data);
