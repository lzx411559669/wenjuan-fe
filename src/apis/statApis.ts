import { Get, Post } from "@/utils/http";

export enum StatApis {
    baseUrl = '/api/stat'
}

export const getQuestionStatList = (questionId: string, opt: {
    page: number; pageSize: number
}) => {
    return Post(`${StatApis.baseUrl}/:id`, { id: questionId }, opt)
}

export const queryComponentStat = (questionId: string, componentId: string) => {

    return Get<any>(`${StatApis.baseUrl}/:questionId/:componentId`, {
        questionId, componentId
    })
}

