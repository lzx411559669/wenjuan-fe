import { getQuestionList } from '@/apis/questionApis';
import { IQuestionCard } from '@/interface/question.moudule';
import {
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_PARAM_KEY,
  List_SEARCH_PARAM_KEY,
} from '@/utils/constants';
import { useDebounceFn, useRequest } from 'ahooks';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const useLoadMore = (containerRef: React.RefObject<HTMLDivElement>, refreshDeps: any = []) => {
  const [started, setStarted] = useState(false);
  const [list, setList] = useState<IQuestionCard[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const hasMore = list.length < total;

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get(List_SEARCH_PARAM_KEY) ?? '';

  const { run, loading } = useRequest(
    async () => {
      const pageSize = Number.parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) ?? '10');
      const data = await getQuestionList({ keyword, pageSize, page });
      return data;
    },
    {
      manual: true,
      onSuccess: (data) => {
        if (data) {
          setList(list.concat(data.list));
          setTotal(data.total);
          setPage(page + 1);
        }
      },
    },
  );

  const { run: tryLoadMore } = useDebounceFn(
    () => {
      if (containerRef.current === null) return;
      const domRect = containerRef.current.getBoundingClientRect();
      if (domRect == null) return;
      const { bottom } = domRect;
      if (bottom <= document.body.clientHeight) {
        run();
        setStarted(true);
      }
    },
    {
      wait: 1000,
    },
  );
  //keywords变化时，重置信息
  useEffect(() => {
    setList([]);
    setPage(1);
    setTotal(0);
    setStarted(false);
  }, [keyword]);

  //监听url变化
  useEffect(() => {
    setList([]);
    setPage(1);
    setTotal(0);
    setStarted(false);
    tryLoadMore();
  }, [...refreshDeps]);

  //监听url变化
  useEffect(() => {
    tryLoadMore();
  }, [searchParams, ...refreshDeps]);

  //监听滚动事件
  useEffect(() => {
    if (hasMore) {
      window.addEventListener('scroll', tryLoadMore);
    }

    return () => window.removeEventListener('scroll', tryLoadMore);
  }, [searchParams, hasMore]);

  return {
    list,
    page,
    loading,
    hasMore,
    total,
    started,
  };
};

export default useLoadMore;
