import { FileTextFilled, SettingOutlined } from '@ant-design/icons';
import * as React from 'react';
import { Tabs } from 'antd';
import ComponentProp from './ComponentProp';
import PageSetting from './PageSetting';
import useComponentsState from '@/store/componentState';
interface IRightPanelProps {}

enum TAB_KEYS {
  PROP_KEY = 'prop',
  SETTING_KEY = 'setting',
}
const RightPanel: React.FunctionComponent<IRightPanelProps> = (props) => {
  const [componentState] = useComponentsState();
  const { selectedId } = componentState;

  const [activeKey, setActiveKey] = React.useState<string>(TAB_KEYS.PROP_KEY);

  React.useEffect(() => {
    if (selectedId) setActiveKey(TAB_KEYS.PROP_KEY);
    else setActiveKey(TAB_KEYS.SETTING_KEY);
  }, [selectedId]);
  const tabItems = [
    {
      key: TAB_KEYS.PROP_KEY,
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
      key: TAB_KEYS.SETTING_KEY,
      label: (
        <span>
          <SettingOutlined />
          页面设置
        </span>
      ),
      children: (
        <div>
          <PageSetting></PageSetting>
        </div>
      ),
    },
  ];
  return (
    <>
      <Tabs activeKey={activeKey} onChange={(key) => setActiveKey(key)} items={tabItems}></Tabs>
    </>
  );
};

export default RightPanel;
