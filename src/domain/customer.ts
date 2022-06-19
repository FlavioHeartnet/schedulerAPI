import { ICustomer } from './interfaces'

export default class Customer implements ICustomer {
  public id?: String = ''
  constructor(
    public name: String = '',
    public registrationId: String = '',
    public birthdate: Date
  ) {}
}
