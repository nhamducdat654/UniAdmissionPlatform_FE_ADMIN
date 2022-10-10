import {
  CreateSuccessNotification,
  handleCreateFailNotification
} from '../../notification/CreateProfileUniversityNotification';
import { createProfile } from '../../service/UniversityService';
import { getListDistrictByProvince } from '../../service/DistrictService.js';
import { getListProvinces } from '../../service/ProvinceService.js';
import CreateProfileUniversityComponent from './components/CreateProfileUniversity.component';
import React, { useEffect, useState } from 'react';

const CreateProfileUniversityContainer = () => {
  const [listProvince, setListProvince] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);

  const [district, setDistrict] = useState('');
  const [province, setProvince] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [value, setValue] = useState('');

  const [isDisableDistrict, setIsDisableDistrict] = useState(true);
  useEffect(() => {
    getAllProvinces();
  }, []);
  const getAllProvinces = () => {
    getListProvinces().then((result) => {
      setListProvince(result.data.data.list);
    });
  };
  const onChangeProvince = (value) => {
    setProvince(value);
    getListDistrictByProvince(value).then((result) => {
      setListDistrict(result.data.data.list);
      setIsDisableDistrict(false);
    });
  };
  const onChangeDistricts = (value) => {
    setDistrict(value);
  };
  const onFinish = (values) => {
    values.districtId = district;
    values.provinceId = province;
    values.profileImageUrl = imageUrl;
    values.thumbnailUrl = thumbnail;
    values.description = value;
    values.status = 0;

    createProfile(values)
      .then((result) => {
        CreateSuccessNotification(values);
      })
      .catch((error) => {
        handleCreateFailNotification(error.response.data.msg);
      });
  };
  return (
    <>
      <CreateProfileUniversityComponent
        provinces={listProvince}
        districts={listDistrict}
        onChangeProvince={onChangeProvince}
        onChangeDistricts={onChangeDistricts}
        isDisableDistrict={isDisableDistrict}
        onFinish={onFinish}
        setImageUrl={setImageUrl}
        setThumbnail={setThumbnail}
        value={value}
        setValue={setValue}
      />
    </>
  );
};
export default CreateProfileUniversityContainer;
