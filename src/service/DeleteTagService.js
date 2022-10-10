import { CallAPI } from './axiosBase';
import { DELETE_TAGS } from '../constants/Endpoints/DeleteTagEndPoint';

export const DeleteTag = (data) => CallAPI(`${DELETE_TAGS}/${data}`, 'delete');
