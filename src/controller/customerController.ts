import CustomerAdapter from '../application/customerAdapter'
import Customer from '../domain/customer'
import ResponseError from '../domain/responseError'
import ResponseSuccess from '../domain/responseSuccess'

export default class CustomerController extends CustomerAdapter {
  constructor() {
    super()
  }

  public newCustomer(
    newCustomer: Customer
  ): Promise<ResponseSuccess | ResponseError> {
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
  ): Promise<ResponseSuccess | ResponseError> {
    const customer: Customer = {
      name: name,
      registrationId: registrationId,
      birthdate: birthdate,
    }

    return this.update(customer, id)
      .then((result) => result as ResponseSuccess)
      .catch((error) => error as ResponseError)
  }

  public async getById(id: string): Promise<ResponseSuccess | ResponseError> {
    return this.getCustomerById(id)
      .then((result) => result as ResponseSuccess)
      .catch((error) => error as ResponseError)
  }

  public async getAll(): Promise<ResponseSuccess | ResponseError> {
    const data = this.getAllCustomers()
    return data
      .then((result) => result as ResponseSuccess)
      .catch((error) => error as ResponseError)
  }
}
