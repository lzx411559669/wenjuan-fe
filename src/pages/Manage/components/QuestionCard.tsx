import { Button, Divider } from '@mui/material';
import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Modal, Popconfirm, Tag, message } from 'antd';
import { IQuestionCard } from '@/interface/question.moudule';
import { RoutePathEnum } from '@/routes/routerEnum';
import { deleteQuestion, duplicateQuestion, updateQuestion } from '@/apis/questionApis';
import { useRequest } from 'ahooks';

type PropsType = IQuestionCard & {
  updateRefrsh: () => void;
};

const QuestionCard: React.FunctionComponent<PropsType> = (props: PropsType) => {
  const nav = useNavigate();
  const { _id, title, isStar, isPublish, answerCount, createAt } = props;

  const [isStarState, setIsStarState] = React.useState<boolean>(isStar);

  const copyQuestion = () => {};

  const deleteQuestionConfirm = () => {
    Modal.confirm({
      title: '确定要删除此问卷吗？',
      // icon: <DeleteOutlineIcon />,
      onOk: () => {
        deleteQuestionHandler();
      },
    });
  };

  const { run: operationQuestion, loading } = useRequest(
    async () => {
      updateQuestion({ id: _id }, {
        isStar: !isStar,
      } as any);
    },
    {
      manual: true,
      onSuccess: () => {
        setIsStarState(!isStarState);
        message.success('操作成功');
      },
    },
  );

  const { run: duplicateQuestionHandler, loading: duplicateLoading } = useRequest(
    async () => {
      return await duplicateQuestion({ id: _id });
    },
    {
      manual: true,
      onSuccess: (result: any) => {
        message.success('复制成功');
        nav(`/question/edit/${result}`);
      },
    },
  );

  const { run: deleteQuestionHandler, loading: deleteLoading } = useRequest(
    async () => await deleteQuestion({ id: _id }),
    {
      manual: true,
      onSuccess: (res) => {
        if (res) {
          message.success('删除成功');
          props.updateRefrsh();
        }
      },
    },
  );

  return (
    <>
      <Card bordered={false} className=" my-8">
        <div className="p-0">
          <div className="flex mb-4 items-center">
            <div className="flex-1">
              <Link
                className=" text-lg text-blue-500 no-underline items-center flex"
                to={isPublish ? `/question/edit/${_id}` : `/question/stat/${_id}`}
              >
                <div className="mr-2 items-center flex">
                  {isStarState && <StarBorderIcon style={{ color: 'red' }}></StarBorderIcon>}
                </div>
                {title}
              </Link>
            </div>
            <div className="flex-1 text-right">
              {isPublish ? <Tag color="default">未发布</Tag> : <Tag color="blue">已发布</Tag>}
              <span className="mx-1">答卷：{answerCount}</span>
              <span className="mx-1">{createAt}</span>
            </div>
          </div>
          <Divider />
          <div className="flex mt-4 items-center">
            <div className="flex-1 text-left">
              <Button
                variant="text"
                onClick={() => {
                  nav(`/question/edit/${_id}`);
                }}
                startIcon={<EditIcon fontSize="large" />}
              >
                编辑问卷
              </Button>
              <Button
                disabled={isPublish}
                variant="text"
                onClick={() => nav(RoutePathEnum.MANAGE_STAR)}
                startIcon={<StackedLineChartIcon />}
              >
                数据统计
              </Button>
            </div>
            <div className="flex-1 text-right">
              <Button
                disabled={loading}
                onClick={() => operationQuestion()}
                startIcon={<StarBorderIcon />}
              >
                {isStarState ? '取消收藏' : '收藏问卷'}
              </Button>
              <Popconfirm
                title="确定复制此问卷吗？"
                okText="确定"
                cancelText="取消"
                onConfirm={() => duplicateQuestionHandler()}
              >
                <Button disabled={duplicateLoading} startIcon={<ContentCopyIcon />}>
                  复制
                </Button>
              </Popconfirm>
              <Button
                onClick={() => {
                  deleteQuestionConfirm();
                }}
                startIcon={<DeleteOutlineIcon />}
              >
                删除
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default QuestionCard;
