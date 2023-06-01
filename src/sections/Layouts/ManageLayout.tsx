import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Sidebar from '../Sidebar';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';

const ManageSideBarRoutes = [
  {
    title: '问卷列表',
    path: '/manage/questionList',
    icon: FormatListNumberedIcon,
  },
  {
    title: '我的标记',
    path: '/manage/star',
    icon: StarIcon,
  },
  {
    title: '回收站',
    path: '/manage/trash',
    icon: DeleteIcon,
  },
];

const ManageLayout: React.FunctionComponent = () => {
  return (
    <>
      <div>
        <Header></Header>
        <Sidebar routes={ManageSideBarRoutes}></Sidebar>
        <div className="px-40 pt-10">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};

export default ManageLayout;
