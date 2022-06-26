import { IResponseSuccess } from './interfaces'

export default class ResponseSuccess implements IResponseSuccess {
  snapshop: unknown[]
  message: string
}
