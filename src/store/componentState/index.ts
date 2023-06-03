import { ComponentPropsType } from '@/components/QuestionComponents';
import { useCallback, useMemo } from 'react';
import { atom, useRecoilState } from 'recoil';
import { produce } from 'immer';
import { cloneDeep } from 'lodash';
import { nanoid } from 'nanoid';

//组件类型
export type ComponentInfoType = {
  fe_id: string;
  type: string;
  title: string;
  isHidden?: boolean; //是否隐藏
  isLocked?: boolean; //是否锁定
  props: ComponentPropsType;
};
//组件state类型
export type ComponentStateType = {
  componentList: Array<ComponentInfoType>;
  selectedId: string;
  copiedComponent: ComponentInfoType | null;
};

const state = atom({
  key: 'componentsState',
  default: {
    selectedId: '', //当前选中id
    componentList: [], //组件列表
    copiedComponent: null,
  } as ComponentStateType,
});

export type Actions = {
  resetComponents: (componentList: Array<ComponentInfoType>) => void;
  changeSelectedId: (id: string) => void; //改变选中的id
  addComponent: (component: ComponentInfoType) => void; //添加组件
  changeComponentProps: (id: string, props: ComponentPropsType) => void; //改变组件props
  removeSelectedComponent: () => void; //删除选中的组件
  changeComponentHidden: (feid: string, isHidden: boolean) => void;
  toggleComponentLocked: (feid: string) => void;
  copySelectedComponent: () => void; //复制选中的组件,
  pasteCopiedComponent: () => void; //粘贴选中的组件,
  slectPrevComponent: () => void; //选择上一个组件
  slectNextComponent: () => void; //选择下一个组件
};

const useComponentsState = (): [ComponentStateType, Actions, ComponentInfoType] => {
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

  const addComponent = useCallback(
    (component: ComponentInfoType) => {
      setComponentsState(
        produce((draft) => {
          insertNewComponent(draft, component);
        }),
      );
      //   setComponentsState((prev) => ({
      //     ...prev,
      //     componentList: [...prev.componentList, component],
      //   }));
    },
    [setComponentsState, componentsState],
  );

  const changeComponentProps = useCallback(
    (id: string, props: ComponentPropsType) => {
      setComponentsState(
        produce((draft) => {
          const index = draft.componentList.findIndex((item) => item.fe_id === id);
          if (index >= 0) {
            draft.componentList[index].props = props;
          }
        }),
      );
    },
    [setComponentsState, componentsState],
  );

  const removeSelectedComponent = useCallback(() => {
    setComponentsState(
      produce((draft) => {
        const { selectedId, componentList } = draft;
        const index = componentList.findIndex((item) => item.fe_id === selectedId);
        //重置selectedId
        const nextSelectedId = getNextSelectedId(selectedId, componentList);
        draft.selectedId = nextSelectedId;
        if (index >= 0) {
          draft.componentList.splice(index, 1);
        }
      }),
    );
  }, [setComponentsState, componentsState]);

  const changeComponentHidden = useCallback(
    (feid: string, isHidden: boolean) => {
      setComponentsState(
        produce((draft) => {
          const { componentList } = draft;
          const component = componentList.find((item) => item.fe_id === feid);
          let nextSelectedId = '';
          if (isHidden) {
            //隐藏
            nextSelectedId = getNextSelectedId(feid, componentList);
          } else {
            //显示，默认选中当前需要显示的id
            nextSelectedId = feid;
          }
          draft.selectedId = nextSelectedId;
          if (component) {
            component.isHidden = isHidden;
          }
        }),
      );
    },
    [setComponentsState, componentsState],
  );

  const toggleComponentLocked = useCallback(
    (feid: string) => {
      setComponentsState(
        produce((draft) => {
          const { componentList } = draft;
          const component = componentList.find((item) => item.fe_id === feid);
          if (component) {
            component.isLocked = !component.isLocked;
          }
        }),
      );
    },
    [setComponentsState, componentsState],
  );

  const copySelectedComponent = useCallback(() => {
    setComponentsState(
      produce((draft) => {
        const { selectedId, componentList } = draft;
        const selectedComponent = componentList.find((item) => item.fe_id === selectedId);
        if (selectedComponent) {
          draft.copiedComponent = cloneDeep(selectedComponent);
        }
      }),
    );
  }, []);

  const pasteCopiedComponent = useCallback(() => {
    setComponentsState(
      produce((draft) => {
        const { copiedComponent } = draft;
        if (copiedComponent) {
          copiedComponent.fe_id = nanoid();
          insertNewComponent(draft, copiedComponent);
        }
      }),
    );
  }, []);

  const slectPrevComponent = useCallback(() => {
    setComponentsState(
      produce((draft) => {
        const { selectedId, componentList } = draft;
        const index = componentList.findIndex((item) => item.fe_id === selectedId);
        if (index <= 0) {
          //未选择，或者选中第一个
          return;
        }
        draft.selectedId = componentList[index - 1].fe_id;
      }),
    );
  }, []);

  const slectNextComponent = useCallback(() => {
    setComponentsState(
      produce((draft) => {
        const { selectedId, componentList } = draft;
        const index = componentList.findIndex((item) => item.fe_id === selectedId);
        if (index < 0) {
          //未选择
          return;
        }
        if (index + 1 === componentList.length) {
          //选中最后一个
          return;
        }
        draft.selectedId = componentList[index + 1].fe_id;
      }),
    );
  }, []);

  const selectComponent = useMemo(() => {
    return (
      componentsState.componentList.find((item) => item.fe_id === componentsState.selectedId) || {}
    );
  }, [componentsState]);

  return [
    componentsState,
    {
      resetComponents,
      changeSelectedId,
      addComponent,
      changeComponentProps,
      removeSelectedComponent,
      changeComponentHidden,
      toggleComponentLocked,
      copySelectedComponent,
      pasteCopiedComponent,
      slectPrevComponent,
      slectNextComponent,
    },
    selectComponent as ComponentInfoType,
  ];
};

export default useComponentsState;

/**
 * 获取下一个selectedid
 * @param fe_id 当前id
 * @param componentList 组件列表
 */
const getNextSelectedId = (fe_id: string, componentList: ComponentInfoType[]) => {
  const visibleComponentList = componentList.filter((item) => !item.isHidden);
  const index = visibleComponentList.findIndex((item) => item.fe_id === fe_id);
  if (index < 0) {
    return '';
  }
  const length = visibleComponentList.length;
  if (length <= 1) {
    return '';
  }
  //如果删除的最后一个则选中上一个
  if (index + 1 === visibleComponentList.length) {
    return visibleComponentList[index - 1].fe_id;
  }
  //不是最后一个，选中下一个
  return visibleComponentList[index + 1].fe_id;
};

const insertNewComponent = (draft: ComponentStateType, newComponent: ComponentInfoType) => {
  const selectId = draft.selectedId;
  const index = draft.componentList.findIndex((item) => item.fe_id === selectId);
  if (index < 0) {
    //如果未选中任何组件
    draft.componentList.push(newComponent);
  } else {
    //如果选中组件，则插入到index的后面
    draft.componentList.splice(index + 1, 0, newComponent);
  }
  draft.selectedId = newComponent.fe_id;
};
