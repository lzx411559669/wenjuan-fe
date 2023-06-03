import { ComponentPropsType, getComponentConfByType } from '@/components/QuestionComponents';
import useComponentsState from '@/store/componentState';
import * as React from 'react';

interface IComponentPropProps {}

const NoProps = () => {
  return <div className=" text-center">未选中组件</div>;
};

const ComponentProp: React.FunctionComponent<IComponentPropProps> = () => {
  const [componentState, actions, selectedPropComponent] = useComponentsState();
  if (!selectedPropComponent) {
    return <NoProps></NoProps>;
  }

  const { type, props, isLocked, isHidden } = selectedPropComponent;
  const newProps = {
    ...props,
    disabled: isLocked || isHidden,
  };
  const componentConf = getComponentConfByType(type);
  if (!componentConf) return <NoProps></NoProps>;
  const { PropComponent } = componentConf;

  const changeProps = (newProps: ComponentPropsType) => {
    if (!selectedPropComponent) {
      return;
    }
    const { fe_id } = selectedPropComponent;
    actions.changeComponentProps(fe_id, newProps);
  };
  return <PropComponent {...newProps} onChange={changeProps}></PropComponent>;
};

export default ComponentProp;
