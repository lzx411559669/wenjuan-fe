import { produce } from 'immer';
import { useCallback } from 'react';
import { atom, useRecoilState } from 'recoil';

//state类型
export type PageInfoStateType = {
  title?: string;
  desc?: string;
  js?: string;
  css?: string;
};
/**
 * state
 */
const state = atom<PageInfoStateType>({
  key: 'pageInfoState',
  default: {
    title: '', //
    desc: '', //
    js: '',
    css: '',
  },
});

/**
 * 定义actions
 */

export type Actions = {
  resetPageInfoState: (newInfo: PageInfoStateType) => void;
  changeTitle: (newTitle: string) => void;
};

const usePageInfoState = (): [PageInfoStateType, Actions] => {
  const [pageInfoState, setPageInfoState] = useRecoilState<PageInfoStateType>(state);

  const resetPageInfoState = useCallback(
    (newInfo: PageInfoStateType) => {
      setPageInfoState((prev) => ({ ...prev, ...newInfo }));
      //   setPageInfoState(
      //     produce((draft: PageInfoStateType) => {
      //       draft.css = newInfo.css;
      //       draft.js = newInfo.js;
      //       draft.desc = newInfo.desc;
      //       draft.title = newInfo.title;
      //     }),
      //   );
    },

    [setPageInfoState, pageInfoState],
  );
  const changeTitle = useCallback((title: string) => {
    setPageInfoState(
      produce((draft) => {
        draft.title = title;
      }),
    );
  }, []);

  return [pageInfoState, { resetPageInfoState, changeTitle }];
};

export default usePageInfoState;
