import {
  CREATE_GOAL_ADMISSION_TYPE_ENDPOINT,
  DELETE_GOAL_ADMISISON_TYPE_ENDPOINT,
  GET_LIST_GOAL_ADMISSION_TYPE_ENDPOINT,
  UPDATE_GOAL_ADMISISON_TYPE_ENDPOINT
} from '../constants/Endpoints/GoalAdmissionTypeEndpoint';
import { CallAPI } from './axiosBase';

export const getListGoalAdmissionType = (data) => CallAPI(`${GET_LIST_GOAL_ADMISSION_TYPE_ENDPOINT}`, 'get', '', data);
export const createGoalAdmissionType = (data) => CallAPI(CREATE_GOAL_ADMISSION_TYPE_ENDPOINT, 'post', data);
export const updateGoalAdmissionType = (data) =>
  CallAPI(`${UPDATE_GOAL_ADMISISON_TYPE_ENDPOINT}/${data.id}`, 'put', data.data);
export const deleteGoalAdmissionType = (data) =>
  CallAPI(`${DELETE_GOAL_ADMISISON_TYPE_ENDPOINT}/${data}`, 'delete', data);
