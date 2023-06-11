import { getComponentConfByType } from '@/components/QuestionComponents';
import useComponentsState, { ComponentInfoType } from '@/store/componentState';
import * as React from 'react';

interface IComponentListProps {
  componentList: ComponentInfoType[];
  selectedId: string;
  setSelectedId: (fe_id: string) => void;
  setSelectedComponentType: (type: string) => void;
}

const ComponentList: React.FunctionComponent<IComponentListProps> = (props) => {
  const { componentList, selectedId, setSelectedId, setSelectedComponentType } = props;

  //   const handleClick = (fe_id: string) => {
  //     actions.changeSelectedId(fe_id);
  //   };

  return (
    <>
      <div>
        {componentList
          .filter((c) => !c.isHidden)
          .map((c) => {
            const { type, fe_id, props } = c;

            const componentConf = getComponentConfByType(type);
            if (!componentConf) return <></>;

            const { Component } = componentConf;

            return (
              <div
                className={`component-wrapper ${fe_id === selectedId ? 'border-important' : ''}`}
                key={fe_id}
                onClick={() => {
                  setSelectedId(fe_id);
                  setSelectedComponentType(type);
                }}
              >
                <div className=" pointer-events-none">
                  <Component {...props}></Component>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ComponentList;
