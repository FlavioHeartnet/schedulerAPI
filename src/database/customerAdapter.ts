import { collection, getDocs, query, where } from 'firebase/firestore'
import Customer from '../model/customer'
import ResponseError from '../model/responseError'
import ResponseSuccess from '../model/responseSuccess'
import firebaseAdapter from './firebaseAdapter'

export default class CustomerAdapter extends firebaseAdapter {
  constructor() {
    super()
  }

  public static COLLECTION: string = 'Customers'

  async insert(data: Customer): Promise<ResponseSuccess | ResponseError> {
    try {
      if (await this.isRegistrationValid(data.registrationId)) {
        return {
          message: (await this.store(data, CustomerAdapter.COLLECTION)).message,
          snapshop: [],
        } as ResponseSuccess
      } else {
        return {
          code: 'already_exists',
          message: 'Registration already exists',
        } as ResponseError
      }
    } catch (e) {
      return e as ResponseError
    }
  }

  async update(
    data: Customer,
    id: string
  ): Promise<ResponseSuccess | ResponseError> {
    try {
      await this.edit(data, CustomerAdapter.COLLECTION, id)
      return { message: id, snapshop: [data] } as ResponseSuccess
    } catch (e) {
      return e as ResponseError
    }
  }

  async getCustomerById(id: string): Promise<ResponseSuccess | ResponseError> {
    return this.getDocbyId(CustomerAdapter.COLLECTION, id)
      .then((result) => result as ResponseSuccess)
      .catch((error) => error as ResponseError)
  }

  async getAllCustomers(): Promise<ResponseSuccess | ResponseError> {
    const data = this.getAllbyCollection(CustomerAdapter.COLLECTION)
    return data
      .then((result) => result as ResponseSuccess)
      .catch((error) => error as ResponseError)
  }

  isRegistrationValid(registration: String): Promise<boolean> {
    return new Promise((resolve) => {
      getDocs(
        query(
          collection(this.db, CustomerAdapter.COLLECTION),
          where('registrationId', '==', registration)
        )
      ).then((snapshot) => {
        if (snapshot.empty) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
    })
  }
}
