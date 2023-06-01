import * as React from 'react';
import { Button, Empty, Pagination, Typography } from 'antd';
import QuestionCard from './components/QuestionCard';
import { useRequest } from 'ahooks';
import { getQuestionList } from '@/apis/questionApis';
import useLoadQuestionsData from '@/hooks/useLoadQuestionsData';
import ListPage from '@/components/ListPage';
const { Title } = Typography;
interface IStarProps {}

const Star: React.FunctionComponent<IStarProps> = (props) => {
  const { questionListData = { list: [], total: 0 }, loading } = useLoadQuestionsData({
    isStar: true,
  });

  const { total, list } = questionListData;
  return (
    <>
      <div className="flex justify-between items-center">
        <Title level={3}>我的收藏</Title>
      </div>
      <div>
        {list?.length === 0 ? (
          <Empty />
        ) : (
          list
            ?.filter((quesion) => quesion.isStar)
            .map((question) => (
              <div key={question._id}>
                <QuestionCard {...question} updateRefrsh={() => {}} />
              </div>
            ))
        )}
      </div>
      <div className=" text-right">
        <ListPage total={total}></ListPage>
      </div>
    </>
  );
};

export default Star;
