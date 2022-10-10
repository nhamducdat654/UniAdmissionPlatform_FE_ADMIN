import { PATH } from '../../../constants/Paths/Path';
import ncNanoId from '../../../utils/ncNanoId';

const homePage = [
  {
    id: ncNanoId(),
    name: 'Trang Chủ',
    href: PATH.INDEX
  }
];

const tag = [
  {
    id: ncNanoId(),
    href: PATH.TAG,
    name: 'Thẻ'
  }
];
