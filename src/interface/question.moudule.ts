export interface IQuestionCard {
  _id: string;
  title: string;
  isStar: boolean;
  isPublish: boolean;
  answerCount: number;
  createAt: string;
  isDelete: boolean;
  componentList?: any[];
}
