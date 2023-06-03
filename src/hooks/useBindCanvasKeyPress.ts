import useComponentsState from '@/store/componentState';
import { useKeyPress } from 'ahooks';

const isActiveElementValid = () => {
  const activeElement = document.activeElement;
  if (activeElement === document.body) return true; //光标没有focus到input
  return false;
};

const useBindCanvasKeyPress = () => {
  const [, actions] = useComponentsState();
  //删除组件
  useKeyPress(['Backspace', 'Delete'], () => {
    if (isActiveElementValid()) {
      actions.removeSelectedComponent();
    }
  });

  //复制组件
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (isActiveElementValid()) {
      actions.copySelectedComponent();
    }
  });

  //粘贴组件
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (isActiveElementValid()) {
      actions.pasteCopiedComponent();
    }
  });

  //选中上一个
  useKeyPress(['uparrow'], () => {
    if (isActiveElementValid()) {
      actions.slectPrevComponent();
    }
  });
  //选中下一个
  useKeyPress(['downarrow'], () => {
    if (isActiveElementValid()) {
      actions.slectNextComponent();
    }
  });
};

export default useBindCanvasKeyPress;
