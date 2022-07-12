import { ICustomer } from './interfaces'

export default class Customer implements ICustomer {
  public id?: string = ''
  name: string
  registrationId: string
  birthdate: Date
}
