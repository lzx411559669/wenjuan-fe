import { Page, PageParam } from '@/interface/base';
import { IQuestionCard } from '@/interface/question.moudule';
import { Delete, Get, Post, Put } from '@/utils/http';

export enum QuestionApis {
  baseUrl = '/api/question',
  questionList = '/api/questionList',
}

export type SearchOptions = Pick<IQuestionCard, 'isPublish' | 'isStar' | 'isDelete'> & {
  keyword: string;
} & PageParam;

export const getQuestionList = async (params: Partial<SearchOptions>) => {
  const res = await Get<Page<IQuestionCard>>(QuestionApis.questionList, params);
  if (res) {
    return res;
  }
};

export const createQuestion = async (question: IQuestionCard) => {
  const res = await Post<IQuestionCard>(QuestionApis.baseUrl, {}, question);
  if (res) {
    return res;
  }
};

export const updateQuestion = async (params: { id: string }, question: IQuestionCard) => {
  const res = await Put<IQuestionCard>(`${QuestionApis.baseUrl}/:id`, params, question);
  if (res) {
    return res;
  }
};

export const duplicateQuestion = async (params: { id: string }) => {
  const res = await Post<IQuestionCard>(`${QuestionApis.baseUrl}/duplicate/:id`, params);
  if (res) {
    return res;
  }
};

export const deleteQuestion = async (params: { id: string }) => {
  const res = await Delete<IQuestionCard>(`${QuestionApis.baseUrl}/del/:id`, params);
  if (res) {
    return res;
  }
};

export const recoverQuestion = async (body: any[]) => {
  const res = await Post<IQuestionCard>(`${QuestionApis.baseUrl}/recover`, {}, body);
  if (res) {
    return res;
  }
};

export const delQuestionByIds = async (body: any[]) => {
  const res = await Post<IQuestionCard>(`${QuestionApis.baseUrl}/del`, {}, body);
  if (res) {
    return res;
  }
};
