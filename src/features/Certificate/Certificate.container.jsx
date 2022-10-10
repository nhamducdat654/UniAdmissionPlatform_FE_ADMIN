import { deleteCertificate, getListCertificate } from '../../service/CertificateService';
import { handleDeleteNotification, handleGetListNotification } from '../../notification/CertificateNotification';
import { useEffect, useRef, useState } from 'react';
import ListCertificateComponent from './Conponents/ListCertificate.component';

const CertificateContainer = () => {
  const [listCertificate, setListCertificate] = useState('');
  const [loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getListCertificate()
      .then((result) => {
        setListCertificate(result.data.data.list);

        setLoading(false);
      })
      .catch((error) => {
        handleGetListNotification('error');
      });
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
    setLoading(false);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const deleteAPI = (id) => {
    deleteCertificate(id)
      .then((result) => {
        handleDeleteNotification('success', result.data.data);
        setLoading(true);
        setTimeout(loadData, 2000);
      })
      .catch((error) => {
        handleDeleteNotification('error');
      });
  };

  const handleDelete = (id) => {
    console.log('delete id: ', id);
    deleteAPI(id);
  };

  return (
    <>
      <ListCertificateComponent
        listCertificate={listCertificate}
        handleSearch={handleSearch}
        handleReset={handleReset}
        handleDelete={handleDelete}
        setSearchText={setSearchText}
        setSearchedColumn={setSearchedColumn}
        searchedColumn={searchedColumn}
        searchText={searchText}
        searchInput={searchInput}
        loading={loading}
      />
    </>
  );
};
export default CertificateContainer;
