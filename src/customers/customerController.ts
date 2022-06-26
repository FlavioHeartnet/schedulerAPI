import Customer from '../domain/customer'
import CustomerAdapter from './adapters/firebaseAdapter/customerFirebaseAdapter'
import ResponseSuccess from '../domain/responseSuccess'

export default class CustomerController extends CustomerAdapter {
  constructor() {
    super()
  }

  public newCustomer(newCustomer: Customer): Promise<ResponseSuccess> {
    return this.insert(newCustomer)
      .then((result) => result as ResponseSuccess)
      .catch((error) => {
        throw error
      })
  }

  public updateCustomer(
    id: string,
    name: String,
    registrationId: String,
    birthdate: Date
  ): Promise<ResponseSuccess> {
    const customer: Customer = {
      name: name,
      registrationId: registrationId,
      birthdate: birthdate,
    }

    return this.update(customer, id)
      .then((result) => result as ResponseSuccess)
      .catch((error) => error)
  }

  public async getById(id: string): Promise<ResponseSuccess> {
    return this.getCustomerById(id)
      .then((result) => result as ResponseSuccess)
      .catch((error) => error)
  }

  public async getAll(): Promise<ResponseSuccess> {
    const data = this.getAllCustomers()
    return data
      .then((result) => result as ResponseSuccess)
      .catch((error) => error)
  }
}
