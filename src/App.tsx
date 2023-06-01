import { Fragment } from 'react';
import { BrowserRouter, RouterProvider } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';

import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';
// import Pages from '@/routes/Pages';
// import Header from '@/sections/Header';
import HotKeys from '@/sections/HotKeys';
import Notifications from '@/sections/Notifications';
import SW from '@/sections/SW';
// import Sidebar from '@/sections/Sidebar';
import router from '@/routes/router';
import './index.css';
import 'uno.css';
import 'antd/dist/reset.css';

function App() {
  return (
    <Fragment>
      <CssBaseline />
      <Notifications />
      <HotKeys />
      <SW />
      <RouterProvider router={router}></RouterProvider>
      {/* <BrowserRouter>
        <Header />
        <Sidebar />
        <Pages />
      </BrowserRouter> */}
    </Fragment>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
