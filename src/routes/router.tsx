import Home from '@/pages/Home';
import Login from '@/pages/Login';
import QuestionList from '@/pages/Manage/QuestionList';
import Star from '@/pages/Manage/Star';
import Trash from '@/pages/Manage/Trash';
import NotFound from '@/pages/NotFound';
import Edit from '@/pages/Question/Edit';
import Stat from '@/pages/Question/Stat';
import Register from '@/pages/Register';
import MainLayout from '@/sections/Layouts/MainLayout';
import ManageLayout from '@/sections/Layouts/ManageLayout';
import QuestionLayout from '@/sections/Layouts/QuestionLayout';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/login',
        element: <Login></Login>,
      },
      {
        path: '/register',
        element: <Register></Register>,
      },
    ],
  },
  {
    path: '/manage',
    element: <ManageLayout></ManageLayout>,
    children: [
      {
        path: 'questionList',
        element: <QuestionList></QuestionList>,
      },
      {
        path: 'star',
        element: <Star></Star>,
      },
      {
        path: 'trash',
        element: <Trash></Trash>,
      },
    ],
  },
  {
    path: '/question',
    element: <QuestionLayout></QuestionLayout>,
    children: [
      {
        path: 'edit/:id',
        element: <Edit></Edit>,
      },
      {
        path: 'stat/:id',
        element: <Stat></Stat>,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound></NotFound>,
  },
]);

export default router;
