import { approveAccount, getAllAccount } from '../../../service/AccountRepresentatives.Service';
import { handleChangeStatusNotification } from '../../../notification/AccountRepresentativesNotification';
import FirstRepresentativesComponent from './components/FirstRepresentatives.components';
import React, { useEffect, useState } from 'react';

const FirstRepresentativesContainer = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [dataSearch, setDataSearch] = useState({
    firstName: '',
    email: '',
    phone: '',
    status: 1,
    page: 1,
    limit: 10
  });
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
  const onChangePage = (page, limit) => {
    setDataSearch({
      ...dataSearch,
      page,
      limit
    });
  };
  const handleApprove = (value) => {
    approveAccount(value.id)
      .then((result) => {
        handleChangeStatusNotification('success', `${result.data.msg}`);
        loadData({
          'first-name': dataSearch.firstName ? dataSearch.firstName : '',
          'email-contact': dataSearch.email ? dataSearch.email : '',
          status: dataSearch.status,
          'phone-number': dataSearch.phone ? dataSearch.phone : '',
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
      status: dataSearch.status,
      'phone-number': dataSearch.phone ? dataSearch.phone : '',
      page: dataSearch.page,
      limit: dataSearch.limit
    });
  }, [dataSearch]);

  return (
    <>
      <FirstRepresentativesComponent
        data={data}
        dataSearch={dataSearch}
        setDataSearch={setDataSearch}
        loading={loading}
        setLoading={setLoading}
        onChangePage={onChangePage}
        handleOk={handleApprove}
      />
    </>
  );
};
export default FirstRepresentativesContainer;
