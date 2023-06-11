import { Post } from "@/utils/http";

export enum StatApis {
    baseUrl = '/api/stat'
}

export const getQuestionStatList = (questionId: string, opt: {
    page: number; pageSize: number
}) => {
    return Post(`${StatApis.baseUrl}/:id`, { id: questionId }, opt)
}