import { SearchOptions, getQuestionList } from '@/apis/questionApis';
import {
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_PARAM_KEY,
  List_SEARCH_PARAM_KEY,
} from '@/utils/constants';
import { useRequest } from 'ahooks';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const useLoadQuestionsData = (options: Partial<SearchOptions> = {}, refreshDeps: any[] = []) => {
  const { isStar, isDelete, isPublish } = options;
  const [searchParams] = useSearchParams();

  const {
    data: questionListData = { list: [], total: 0 },
    loading,
    error,
    refresh,
  } = useRequest(
    async () => {
      const keyword = searchParams.get(List_SEARCH_PARAM_KEY) ?? '';
      const pageSize = Number.parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) ?? '10');
      const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) ?? '1');
      const data = await getQuestionList({ keyword, isStar, isDelete, pageSize, page });
      return data;
    },
    {
      refreshDeps: [searchParams, ...refreshDeps],
    },
  );

  return { questionListData, loading, error, refresh };
};

export default useLoadQuestionsData;
