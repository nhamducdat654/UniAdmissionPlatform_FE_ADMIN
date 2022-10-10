import {
  CREATE_CERTIFICATE_ENDPOINT,
  DELETE_CERTIFICATE_ENDPOINT,
  EDIT_CERTIFICATE_ENDPOINT,
  GET_DETAIL_CERTIFICATE_ENDPOINT,
  GET_LIST_CERTIFICATE_ENDPOINT
} from '../constants/Endpoints/CertificateEndpoint';
import { CallAPI } from './axiosBase';

export const getListCertificate = () => CallAPI(`${GET_LIST_CERTIFICATE_ENDPOINT}`);
export const getDetailCertificate = (data) => CallAPI(`${GET_DETAIL_CERTIFICATE_ENDPOINT}/${data}`);
export const createCertificate = (data) => CallAPI(`${CREATE_CERTIFICATE_ENDPOINT}`, 'post', data);
export const editCertificate = (data) => CallAPI(`${EDIT_CERTIFICATE_ENDPOINT}/${data.id}`, 'put', data);
export const deleteCertificate = (data) => CallAPI(`${DELETE_CERTIFICATE_ENDPOINT}/${data}`, 'delete');
