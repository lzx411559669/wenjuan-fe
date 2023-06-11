import { getQuestionStatList } from '@/apis/statApis';
import { useRequest } from 'ahooks';
import * as React from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Pagination, Spin, Table, Typography } from 'antd';
import useComponentsState from '@/store/componentState';
import { LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE_PARAM_KEY } from '@/utils/constants';

const { Title } = Typography;

interface IPageStatProps {
  selectedId: string;
  setSelectedId: (fe_id: string) => void;
  setSelectedComponentType: (type: string) => void;
}

const PageStat: React.FunctionComponent<IPageStatProps> = (props) => {
  const { selectedId, setSelectedId } = props;
  const nav = useNavigate();
  const { id = '' } = useParams();

  const [searchParams] = useSearchParams();

  const { pathname } = useLocation();

  const [page, setPage] = React.useState(1);

  const [pageSize, setPageSize] = React.useState(10);

  React.useEffect(() => {
    const page = searchParams.get(LIST_PAGE_PARAM_KEY);
    const pageSize = searchParams.get(LIST_PAGE_SIZE_PARAM_KEY);
    setPage(page ? parseInt(page) : 1);
    setPageSize(pageSize ? parseInt(pageSize) : 10);
  }, [searchParams]);

  const pageChange = (page: number, pageSize: number) => {
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString());
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString());
    nav({
      pathname: pathname,
      search: searchParams.toString(),
    });
  };

  const [componentsState] = useComponentsState();

  const { componentList } = componentsState;

  const columns = React.useMemo(() => {
    return componentList.map((com) => {
      return {
        title: (
          <div onClick={() => setSelectedId(com.fe_id)} className=" cursor-pointer">
            <span className={selectedId === com.fe_id ? ' text-blue-500' : ''}>
              {com.props.title || com.title}
            </span>
          </div>
        ),
        dataIndex: com.fe_id,
        key: com.fe_id,
      };
    });
  }, [componentList, selectedId]);

  const [total, setTotal] = React.useState<number>(0);

  const [list, setList] = React.useState([]);

  const { loading } = useRequest(
    () =>
      getQuestionStatList(id, {
        page: 1,
        pageSize: 10,
      }),
    {
      onSuccess: (res: any) => {
        const { total, list } = res;
        setTotal(total);
        setList(list);
      },
      refreshDeps: [searchParams],
    },
  );
  return (
    <>
      <div className="p-4">
        <Title level={3}>答卷数量：{total}</Title>
        {/* {loading && (
          <div className="text-center">
            <Spin></Spin>
          </div>
        )} */}
        <Table
          loading={loading}
          dataSource={list.map((i: any) => ({ ...i, key: i._id }))}
          columns={columns}
          pagination={false}
        />
        <div className="mt-8 text-right">
          <Pagination
            current={page}
            pageSize={pageSize}
            onChange={pageChange}
            total={total}
          ></Pagination>
        </div>
      </div>
    </>
  );
};

export default PageStat;
