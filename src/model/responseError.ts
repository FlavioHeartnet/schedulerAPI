import { IResponseError } from './interfaces'

export default class ResponseError implements IResponseError {
  public code: string
  public message: string
}
