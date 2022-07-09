
import Customer from '../domain/customer'
import ResponseSuccess from '../domain/responseSuccess'
import CustomerAdapter from './adapters/firebaseAdapter/customerFirebaseAdapter'
import CreateCustomerDto from './dto/create-customer.dto'
import UpdateCustomerDto from './dto/update-customer.dto'

export default class CustomerController extends CustomerAdapter {
  constructor() {
    super()
  }
  public newCustomer(newCustomer: CreateCustomerDto): Promise<ResponseSuccess> {
    return this.insert(newCustomer as Customer)
      .then((result) => result as ResponseSuccess)
      .catch((error) => {
        throw error
      })
  }

  public updateCustomer(
    id: string,
    customer: UpdateCustomerDto
  ): Promise<ResponseSuccess> {

    return this.update(customer as Customer, id)
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
