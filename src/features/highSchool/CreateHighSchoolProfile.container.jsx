import {
  CreateSuccessNotification,
  handleCreateFailNotification
} from '../../notification/CreateProfileHighSchoolNotification';
import { createProfile } from '../../service/HighSchoolService';
import { getListDistrictByProvince } from '../../service/DistrictService.js';
import { getListProvinces } from '../../service/ProvinceService.js';
import CreateHighSchoolProfileComponent from './components/CreateHighSchoolProfile.component';
import React, { useEffect, useState } from 'react';

const CreateHighSchoolProfileContainer = () => {
  const [listProvince, setListProvince] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);

  const [district, setDistrict] = useState('');
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
      <CreateHighSchoolProfileComponent
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
export default CreateHighSchoolProfileContainer;
