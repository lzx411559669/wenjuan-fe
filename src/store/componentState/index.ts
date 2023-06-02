import { ComponentPropsType } from '@/components/QuestionComponents';
import { useCallback } from 'react';
import { atom, useRecoilState } from 'recoil';

export type ComponentInfoType = {
  fe_id: string;
  type: string;
  title: string;
  props: ComponentPropsType;
};

export type ComponentStateType = {
  componentList: Array<ComponentInfoType>;
  selectedId: string;
};

const state = atom({
  key: 'componentsState',
  default: {
    selectedId: '',
    componentList: [],
  } as ComponentStateType,
});

export type Actions = {
  resetComponents: (componentList: Array<ComponentInfoType>) => void;
  changeSelectedId: (id: string) => void;
};

const useComponentsState = (): [ComponentStateType, Actions] => {
  const [componentsState, setComponentsState] = useRecoilState<ComponentStateType>(state);

  const resetComponents = useCallback(
    (componentList: Array<ComponentInfoType>) => {
      setComponentsState((prev) => ({ ...prev, componentList }));
    },
    [setComponentsState, componentsState],
  );

  const changeSelectedId = useCallback(
    (id: string) => {
      setComponentsState((prev) => ({ ...prev, selectedId: id }));
    },
    [setComponentsState, componentsState],
  );

  return [componentsState, { resetComponents, changeSelectedId }];
};

export default useComponentsState;
