import Base from '../database/firebaseAdapter'
import Customer from '../model/customer'
import ResponseError from '../model/responseError'
import ResponseSuccess from '../model/responseSuccess'

export default class ClienteController extends Base {
  public static Collection: string = 'Cliente'

  constructor() {
    super()
  }

  public insert(
    name: String,
    registrationId: String,
    birthdate: Date
  ): Promise<ResponseSuccess | ResponseError> {
    const customer: Customer = {
      name: name,
      registrationId: registrationId,
      birthdate: birthdate,
    }

    return this.store(customer, ClienteController.Collection)
      .then((result) => result as ResponseSuccess)
      .catch((error) => error as ResponseError)
  }

  public update(
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

    return this.edit(customer, ClienteController.Collection, id)
      .then((result) => result as ResponseSuccess)
      .catch((error) => error as ResponseError)
  }

  public async getById(id: string): Promise<ResponseSuccess | ResponseError> {
    return this.getDocbyId(ClienteController.Collection, id)
      .then((result) => this.convertToCustomer(result as ResponseSuccess))
      .catch((error) => error as ResponseError)
  }

  public async getAll(): Promise<ResponseSuccess | ResponseError> {
    const data = this.getAllbyCollection(ClienteController.Collection)
    return data
      .then((result) => this.convertToCustomer(result as ResponseSuccess))
      .catch((error) => error as ResponseError)
  }
  convertToCustomer(result: ResponseSuccess): any {
    result = result as ResponseSuccess
    result.snapshop = result.snapshop as Customer[]
    return result
  }
}
