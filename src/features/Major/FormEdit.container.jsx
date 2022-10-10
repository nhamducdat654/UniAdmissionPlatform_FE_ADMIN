import { ListMajorGroup } from '../../service/MajorGroupService';
import { MajorDetail } from '../../service/MajorService';
import FormEditComponent from './Components/FormEdit.component';
import React from 'react';

const FormEditContainer = (props) => {
  const { majorID } = props;
  const [majorDetail, setMajorDetail] = useState();
  const [majorGroup, setMajorGroup] = useState();
  const [majorGroupId, setMajorGroupId] = useState(1);

  useEffect(() => {
    loadData(majorID);
  }, [majorID]);

  const loadData = (id) => {
    MajorDetail(id).then((result) => {
      setMajorDetail(result.data.data);
      setLoading(false);
    });
  };

  const handleChange = (value) => {
    setMajorGroupId(value);
    console.log(value);
  };

  const onFinish = (values) => {
    values.id = majorID;
    values.majorGroupId = majorGroupId;
    console.log(values);
    // setLoading(true);
    // edit(values);
  };

  //GET LIST MAJOR GROUP

  useEffect(() => {
    getMajorGroup();
  }, []);

  const getMajorGroup = () => {
    ListMajorGroup().then((result) => {
      setMajorGroup(result.data.data.list);
      // setIsLoading(false);
    });
  };
  return (
    <>
      <FormEditComponent
        onFinish={onFinish}
        majorDetail={majorDetail}
        handleChange={handleChange}
        majorGroup={majorGroup}
      />
    </>
  );
};

export default FormEditContainer;
