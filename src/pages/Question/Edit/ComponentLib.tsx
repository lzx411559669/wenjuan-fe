import { ComponentConfType, componentConfGroup } from '@/components/QuestionComponents';
import * as React from 'react';
import { Typography } from 'antd';
import styles from './ComponentLib.module.scss';
import useComponentsState from '@/store/componentState';
import { nanoid } from 'nanoid';

const { Title } = Typography;

interface IComponentLibProps {}

const getComponent = (c: ComponentConfType) => {
  const [, actions] = useComponentsState();
  const { Component, title, type, defaultProps } = c;

  const handleClick = () => {
    actions.addComponent({
      fe_id: nanoid(),
      title,
      type,
      props: defaultProps,
    });
  };

  return (
    <div className={styles.wrapper} key={c.title} onClick={handleClick}>
      <div className="pointer-events-none">
        <Component></Component>
      </div>
    </div>
  );
};

const ComponentLib: React.FunctionComponent<IComponentLibProps> = (props) => {
  return (
    <>
      {componentConfGroup.map((group, index) => {
        const { groupId, groupName, components } = group;
        return (
          <div key={groupId}>
            <Title level={4} className={index > 0 ? 'mt-5' : ''}>
              {groupName}
            </Title>
            <div>{components.map((c) => getComponent(c))}</div>
          </div>
        );
      })}
    </>
  );
};

export default ComponentLib;
