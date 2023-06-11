import { EditOutlined, LeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Input, Space, Typography, message } from 'antd';
import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EditToolbar from './EditToolbar';
import usePageInfoState from '@/store/pageInfoState';
import useComponentsState from '@/store/componentState';
import { useKeyPress, useRequest, useDebounceEffect } from 'ahooks';
import { updateQuestion } from '@/apis/questionApis';
import { RoutePathEnum } from '@/routes/routerEnum';

const { Title } = Typography;

interface IEditHeaderProps {}

const SaveButton: React.FC = () => {
  const [componentsState] = useComponentsState();
  const [pageInfoState] = usePageInfoState();
  const { componentList = [] } = componentsState;

  const { id } = useParams();
  const { run: save, loading } = useRequest(
    () =>
      updateQuestion(
        { id: id as string },
        {
          ...pageInfoState,
          componentList,
        },
      ),
    {
      manual: true,
    },
  );

  //快捷键保存
  useKeyPress(['ctrl.s', 'mets.s'], (event: KeyboardEvent) => {
    event.preventDefault();
    if (!loading) {
      save();
    }
  });

  //自动保存+防抖
  useDebounceEffect(
    () => {
      if (!loading) {
        save();
      }
    },
    [componentList, pageInfoState],
    {
      wait: 1000,
    },
  );
  return (
    <Button onClick={save} disabled={loading} icon={loading ? <LoadingOutlined /> : null}>
      保存
    </Button>
  );
};

const PublishButton: React.FC = () => {
  const nav = useNavigate();
  const [componentsState] = useComponentsState();
  const [pageInfoState] = usePageInfoState();
  const { componentList = [] } = componentsState;

  const { id } = useParams();
  const { run: publish, loading } = useRequest(
    () =>
      updateQuestion(
        { id: id as string },
        {
          ...pageInfoState,
          componentList,
          isPublish: true,
        },
      ),
    {
      manual: true,
      onSuccess: () => {
        message.success('发布成功');
        nav(`${RoutePathEnum.QUESTION_STAT}${id}`);
      },
    },
  );

  return (
    <Button type="primary" onClick={publish} disabled={loading}>
      发布
    </Button>
  );
};

//显示和修改标题
const TitleElem: React.FC = () => {
  const [pageInfoState, actions] = usePageInfoState();

  const [editState, setEditState] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    if (value) {
      actions.changeTitle(value);
    }
  };

  if (editState) {
    return (
      <Input
        onChange={handleChange}
        onPressEnter={() => setEditState(false)}
        onBlur={() => setEditState(false)}
        value={pageInfoState.title}
      />
    );
  }

  return (
    <>
      <Space>
        <h1 className="mb-0  text-lg font-bold text-black">{pageInfoState.title}</h1>
        <Button
          type="text"
          onClick={() => setEditState(true)}
          icon={<EditOutlined></EditOutlined>}
        ></Button>
      </Space>
    </>
  );
};

const EditHeader: React.FunctionComponent<IEditHeaderProps> = (props) => {
  const nav = useNavigate();
  return (
    <>
      <div className="bg-white p-3 border-b border-gray-300">
        <div className=" flex my-0 mx-6 items-center">
          <div className=" flex-1">
            <Space>
              <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
                返回
              </Button>
              <TitleElem></TitleElem>
            </Space>
          </div>
          <div className=" flex-1 text-center">
            <EditToolbar></EditToolbar>
          </div>
          <div className=" flex-1 text-right">
            <Space>
              <SaveButton />
              <PublishButton />
            </Space>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditHeader;
