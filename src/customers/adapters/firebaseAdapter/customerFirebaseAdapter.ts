import ResponseSuccess from '../../../domain/responseSuccess'
import Customer from '../../../domain/customer'
import FirebaseDb from '../../../infra/firestoreDb/firebaseDb'

export default class CustomerAdapter extends FirebaseDb {
  constructor() {
    super()
  }

  public static COLLECTION: string = 'Customers'

  async insert(data: Customer): Promise<ResponseSuccess> {
    try {
      if (await this.isRegistrationValid(data.registrationId)) {
        return {
          message: (await this.store(data, CustomerAdapter.COLLECTION)).message,
          snapshop: [],
        } as ResponseSuccess
      } else {
        throw new Error('Registration already exists')
      }
    } catch (e) {
      throw e
    }
  }

  async update(data: Customer, id: string): Promise<ResponseSuccess> {
    try {
      await this.edit(data, CustomerAdapter.COLLECTION, id)
      return { message: id, snapshop: [data] } as ResponseSuccess
    } catch (e) {
      throw e
    }
  }

  async getCustomerById(id: string): Promise<ResponseSuccess> {
    return this.getDocbyId(CustomerAdapter.COLLECTION, id)
      .then((result) => result as ResponseSuccess)
      .catch((error) => {
        throw error
      })
  }

  async getAllCustomers(): Promise<ResponseSuccess> {
    const data = this.getAllbyCollection(CustomerAdapter.COLLECTION)
    return data
      .then((result) => result as ResponseSuccess)
      .catch((error) => {
        throw error
      })
  }

  async isRegistrationValid(registration: String): Promise<boolean> {
    try {
      const result = await this.getDocsbyWhere(
        CustomerAdapter.COLLECTION,
        registration,
        'registrationId'
      )
      if (result.empty) {
        return true
      } else {
        return false
      }
    } catch (e) {
      throw this.exceptionHandler(e)
    }
  }
}
