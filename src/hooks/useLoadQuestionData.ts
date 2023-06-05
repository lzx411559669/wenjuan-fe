import { getQuestion } from '@/apis/questionApis';
import useComponentsState from '@/store/componentState';
import usePageInfoState from '@/store/pageInfoState';
import { useRequest } from 'ahooks';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const useLoadQuestionData = () => {
  const { id = '' } = useParams();

  const [componentsState, actions] = useComponentsState();
  const [, pageInfoActions] = usePageInfoState();

  const { data, loading } = useRequest(() => getQuestion({ id }), {
    // onSuccess: (data) => {
    //   actions.resetComponents(data.componentList);
    // },
    refreshDeps: [id],
  });

  useEffect(() => {
    if (!data) return;
    const { componentList, title = '', js = '', css = '', desc = '' } = data;
    if (componentList.length > 0) {
      actions.changeSelectedId(componentList[0].fe_id);
      //把compenentList里面的数据存入store
      actions.resetComponents(componentList);
      //把pageInfo里面的数据存入store
      pageInfoActions.resetPageInfoState({ title, js, css, desc });
    }
  }, [data]);

  return {
    componentsState,
    loading,
    actions,
  };
};

export default useLoadQuestionData;
