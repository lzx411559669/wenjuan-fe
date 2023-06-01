import { delQuestionByIds, getQuestionList, recoverQuestion } from '@/apis/questionApis';
import useLoadQuestionsData from '@/hooks/useLoadQuestionsData';
import { IQuestionCard } from '@/interface/question.moudule';
import { useRequest } from 'ahooks';
import { Button, Space, Table, Tag, Typography, Modal, message } from 'antd';
import * as React from 'react';
const { Title } = Typography;
const { confirm } = Modal;
interface ITrashProps {}

const Trash: React.FunctionComponent<ITrashProps> = (props) => {
  const {
    questionListData = { list: [], total: 0 },
    loading,
    refresh,
  } = useLoadQuestionsData({
    isDelete: true,
  });
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);
  const columns = [
    {
      title: '问卷名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '是否发布',
      dataIndex: 'isPublish',
      key: 'isPublish',
      render: (isPublish: boolean) => {
        return isPublish ? <Tag color="blue">已发布</Tag> : <Tag>未发布</Tag>;
      },
    },
    {
      title: '答卷数',
      dataIndex: 'answerCount',
      key: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
      key: 'createAt',
    },
  ];

  const del = () => {
    confirm({
      title: '确定删除所选问卷吗？',
      okText: '确定',
      cancelText: '取消',
      content: '删除后不可后退，数据无法恢复！',
      onOk: () => {
        delQuestionHandle();
      },
    });
  };

  const { run: recoverQuestionHandle, loading: recoverLoading } = useRequest(
    async () => await recoverQuestion(selectedRowKeys),
    {
      manual: true,
      onSuccess: (res) => {
        if (res) {
          message.success('恢复成功');
          setSelectedRowKeys([]);
          refresh();
        }
      },
    },
  );

  const { run: delQuestionHandle, loading: delLoading } = useRequest(
    async () => await delQuestionByIds(selectedRowKeys),
    {
      manual: true,
      onSuccess: (res) => {
        if (res) {
          message.success('删除成功');
          setSelectedRowKeys([]);
          refresh();
        }
      },
    },
  );

  const TableEle = (
    <>
      <div className=" text-right mb-4">
        <Space>
          <Button disabled={selectedRowKeys.length === 0} onClick={del} danger type="primary">
            彻底删除
          </Button>
          <Button
            disabled={selectedRowKeys.length === 0 || recoverLoading}
            onClick={recoverQuestionHandle}
            type="primary"
          >
            恢复
          </Button>
        </Space>
      </div>
      <Table
        rowSelection={{
          type: 'checkbox',
          onChange: (selectedRowKeys, selectedRows) => {
            console.log(selectedRowKeys);
            setSelectedRowKeys(selectedRowKeys);
          },
        }}
        rowKey={(q) => q._id}
        bordered
        dataSource={questionListData?.list}
        columns={columns}
      />
    </>
  );
  return (
    <>
      <div className="flex justify-between items-center">
        <Title level={3}>回收站</Title>
      </div>
      <div>{TableEle}</div>
    </>
  );
};

export default Trash;
