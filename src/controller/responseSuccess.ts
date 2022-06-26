import { IResponseSuccess } from '../domain/interfaces'

export default class ResponseSuccess implements IResponseSuccess {
  snapshop: unknown[]
  message: string
}
