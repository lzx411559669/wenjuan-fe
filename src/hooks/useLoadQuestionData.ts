import { getQuestion } from '@/apis/questionApis';
import useComponentsState from '@/store/componentState';
import { useRequest } from 'ahooks';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const useLoadQuestionData = () => {
  const { id = '' } = useParams();

  const [componentsState, actions] = useComponentsState();

  const { data, loading } = useRequest(() => getQuestion({ id }), {
    // onSuccess: (data) => {
    //   actions.resetComponents(data.componentList);
    // },
    refreshDeps: [id],
  });

  useEffect(() => {
    console.log('🚀 ~ file: useLoadQuestionData.ts:26 ~ useEffect ~ data:', data);

    if (!data) return;
    const { componentList } = data;
    if (componentList.length > 0) {
      actions.changeSelectedId(componentList[0].fe_id);
      actions.resetComponents(componentList);
    }
  }, [data]);

  return {
    componentsState,
    loading,
    actions,
  };
};

export default useLoadQuestionData;
