import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import * as React from 'react';
import ComponentLib from './ComponentLib';
import Layers from './Layers';

interface ILeftPanelProps {}

const LeftPanel: React.FunctionComponent<ILeftPanelProps> = (props) => {
  const tabItems = [
    {
      key: 'componentLib',
      label: (
        <span>
          <AppstoreOutlined />
          组件库
        </span>
      ),
      children: (
        <div>
          <ComponentLib></ComponentLib>
        </div>
      ),
    },
    {
      key: 'layers',
      label: (
        <span>
          <BarsOutlined />
          图层
        </span>
      ),
      children: (
        <div>
          <Layers></Layers>
        </div>
      ),
    },
  ];
  return (
    <>
      <Tabs defaultActiveKey="componentLib" items={tabItems}></Tabs>
    </>
  );
};

export default LeftPanel;
