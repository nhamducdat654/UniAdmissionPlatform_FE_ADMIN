import { changeStatusAccount, getAllAccount } from '../../../service/AccountRepresentatives.Service';
import { getAllForCombobox } from '../../../service/HighSchoolService';
import {
  handleChangeStatusNotification,
  handleGetListNotification
} from '../../../notification/AccountRepresentativesNotification';
import HighSchoolRepresentativesComponent from './components/HighSchoolRepresentatives.component';
import React, { useEffect, useState } from 'react';

const HighSchoolRepresentativesContainer = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [dataSearch, setDataSearch] = useState({
    firstName: '',
    email: '',
    phone: '',
    status: '',
    highschool: '',
    page: 1,
    limit: 10
  });
  const [highschool, setHighSchool] = useState();
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
      setHighSchool(result.data.data.list);
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
          'high-school-id': dataSearch.highschool ? dataSearch.highschool : '',
          'role-id': 'schoolAdmin',
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
      'high-school-id': dataSearch.highschool ? dataSearch.highschool : '',
      'role-id': 'schoolAdmin',
      page: dataSearch.page,
      limit: dataSearch.limit
    });
    loadHighSchool();
  }, [dataSearch]);

  return (
    <>
      <HighSchoolRepresentativesComponent
        data={data}
        setDataSearch={setDataSearch}
        loading={loading}
        setLoading={setLoading}
        highschool={highschool}
        onChangePage={onChangePage}
        handleOk={handleChangeStatus}
      />
    </>
  );
};
export default HighSchoolRepresentativesContainer;
