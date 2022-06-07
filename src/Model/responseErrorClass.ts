import { IResponseError } from './interfaces'


export default class ResponseErrorClass implements IResponseError {
  public id: string;
  public error: string;
}
