import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, Space } from 'antd';
import styles from './MainLayout.module.css';

const { Header, Footer, Sider, Content } = Layout;
const MainLayout: React.FC = () => {
  return (
    <>
      <Layout>
        <Header>Header</Header>
        <Layout className={styles.main}>
          <Content>
            <Outlet></Outlet>
          </Content>
        </Layout>
        <Footer className=" text-center">问卷@{new Date().getFullYear()}createBy React</Footer>
      </Layout>
    </>
  );
};

export default MainLayout;
