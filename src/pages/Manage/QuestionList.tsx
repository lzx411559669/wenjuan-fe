import * as React from 'react';
import QuestionCard from './components/QuestionCard';
import { useRequest } from 'ahooks';
import { Button, Empty, Typography, Input, Space, Spin } from 'antd';
import { createQuestion, getQuestionList, updateQuestion } from '@/apis/questionApis';
import ListSearch from '@/components/ListSearch';
import useLoadQuestionsData from '@/hooks/useLoadQuestionsData';
import useLoadMore from '@/hooks/useLoadMore';
import { IQuestionCard } from '@/interface/question.moudule';
const { Search } = Input;
const { Title } = Typography;

const QuestionList: React.FunctionComponent = () => {
  const [refresh, setRefresh] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { list, loading, total, hasMore, started } = useLoadMore(containerRef, [refresh]);

  const {
    data: createData,
    run,
    loading: createLoadin,
  } = useRequest(createQuestion, {
    manual: true,
    onSuccess: () => {
      setRefresh(!refresh);
    },
  });

  const questionListItems = list?.map((question) => (
    <div key={question._id}>
      <QuestionCard {...question} updateRefrsh={() => setRefresh(!refresh)} />
    </div>
  ));
  const loadMoreEle = React.useMemo(() => {
    if (!started || loading) return <Spin></Spin>;
    if (total === 0) return <Empty />;
    if (!hasMore) return <div>暂无替多数据...</div>;
    return <div>加载更多...</div>;
  }, [started, loading, total, hasMore]);
  return (
    <>
      <div className="flex justify-between items-center">
        <Title level={3}>我的问卷</Title>
        <Space size="large">
          <Button
            disabled={createLoadin}
            onClick={() =>
              run({
                _id: '10',
                title: '欢迎欢迎',
                isPublish: false,
                isStar: false,
                answerCount: 0,
                createAt: '2022-3-1',
                isDelete: false,
              })
            }
            type="primary"
          >
            新建问卷
          </Button>
          <ListSearch></ListSearch>
        </Space>
      </div>
      <div className=" text-center ">{questionListItems}</div>
      <div ref={containerRef} className=" text-center">
        {loadMoreEle}
      </div>
    </>
  );
};
export default QuestionList;
