import { IResponseError } from '../domain/interfaces'

export default class ResponseError implements IResponseError {
  public code: string
  public message: string
}
