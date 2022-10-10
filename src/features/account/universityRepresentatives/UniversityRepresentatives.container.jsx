import { changeStatusAccount, getAllAccount } from '../../../service/AccountRepresentatives.Service';
import { getAllForCombobox } from '../../../service/UniversityService';
import {
  handleChangeStatusNotification,
  handleGetListNotification
} from '../../../notification/AccountRepresentativesNotification';
import React, { useEffect, useState } from 'react';
import UniversityRepresentativesComponent from './components/UniversityRepresentatives.component';

const UniversityRepresentativesContainer = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [dataSearch, setDataSearch] = useState({
    firstName: '',
    email: '',
    phone: '',
    status: '',
    university: '',
    page: 1,
    limit: 10
  });
  const [university, setUniversity] = useState();
  const loadData = (value) => {
    getAllAccount(value)
      .then((result) => {
        setData(result.data.data.list);
        // handleGetListNotification("success");
        setLoading(false);
      })
      .catch((error) => {
        // handleGetListNotification("error", error.response.data.msg);
      });
  };
  const loadHighSchool = () => {
    getAllForCombobox().then((result) => {
      setUniversity(result.data.data.list);
    });
  };
  const onChangePage = (page, limit) => {
    setDataSearch({
      ...dataSearch,
      page,
      limit
    });
  };
  const handleChangeStatus = (value) => {
    changeStatusAccount(value.id)
      .then((result) => {
        handleChangeStatusNotification('success', `${result.data.msg}`);
        loadData({
          'first-name': dataSearch.firstName ? dataSearch.firstName : '',
          'email-contact': dataSearch.email ? dataSearch.email : '',
          status: dataSearch.status ? dataSearch.status : '',
          'phone-number': dataSearch.phone ? dataSearch.phone : '',
          'university-id': dataSearch.university ? dataSearch.university : '',
          'role-id': 'uniAdmin',
          page: dataSearch.page,
          limit: dataSearch.limit
        });
      })
      .catch((error) => {
        handleChangeStatusNotification('error', `${error.response.data.msg}`);
      });
  };
  useEffect(() => {
    loadData({
      'first-name': dataSearch.firstName ? dataSearch.firstName : '',
      'email-contact': dataSearch.email ? dataSearch.email : '',
      status: dataSearch.status ? dataSearch.status : '',
      'phone-number': dataSearch.phone ? dataSearch.phone : '',
      'university-id': dataSearch.university ? dataSearch.university : '',
      'role-id': 'uniAdmin',
      page: dataSearch.page,
      limit: dataSearch.limit
    });
    loadHighSchool();
  }, [dataSearch]);

  return (
    <>
      <UniversityRepresentativesComponent
        data={data}
        setDataSearch={setDataSearch}
        loading={loading}
        setLoading={setLoading}
        university={university}
        onChangePage={onChangePage}
        handleOk={handleChangeStatus}
      />
    </>
  );
};
export default UniversityRepresentativesContainer;
