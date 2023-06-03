import { FileTextFilled, SettingOutlined } from '@ant-design/icons';
import * as React from 'react';
import { Tabs } from 'antd';
import ComponentProp from './ComponentProp';
interface IRightPanelProps {}

const RightPanel: React.FunctionComponent<IRightPanelProps> = (props) => {
  const tabItems = [
    {
      key: 'prop',
      label: (
        <span>
          <FileTextFilled />
          属性
        </span>
      ),
      children: (
        <div>
          <ComponentProp></ComponentProp>
        </div>
      ),
    },
    {
      key: 'setting',
      label: (
        <span>
          <SettingOutlined />
          页面设置
        </span>
      ),
      children: <div>页面设置</div>,
    },
  ];
  return (
    <>
      <Tabs defaultActiveKey="prop" items={tabItems}></Tabs>
    </>
  );
};

export default RightPanel;
