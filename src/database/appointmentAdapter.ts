import Appointment from '../model/appointments'
import ResponseError from '../model/responseError'
import ResponseSuccess from '../model/responseSuccess'
import firebaseAdapter from './firebaseAdapter'

export default class AppointmentAdapter extends firebaseAdapter {
  public static COLLECTION: string = 'Appointment'
  constructor() {
    super()
  }

  async insert(data: Appointment): Promise<ResponseSuccess | ResponseError> {
    try {
      if (await this.validateAppointment(data)) {
        return {
          message: (await this.store(data, AppointmentAdapter.COLLECTION))
            .message,
          snapshop: [],
        } as ResponseSuccess
      }
      return {
        message: 'Appointment already exists',
        code: 'already_exists',
      } as ResponseError
    } catch (e) {
      throw e
    }
  }

  protected async validateAppointment(data: Appointment): Promise<boolean> {
    return await this.getAppointmentByDate(data.date)
  }

  async getAppointmentByDate(date: Date): Promise<boolean> {
    try {
      const data = await this.getDocsbyWhere(
        AppointmentAdapter.COLLECTION,
        date,
        'date'
      )
      if (data.empty) {
        return false
      }
      return true
    } catch (e) {
      throw e
    }
  }

  async update(
    data: Appointment,
    id: string
  ): Promise<ResponseSuccess | ResponseError> {
    try {
      await this.edit(data, AppointmentAdapter.COLLECTION, id)
      return { message: id, snapshop: [data] } as ResponseSuccess
    } catch (e) {
      throw this.exceptionHandler(e)
    }
  }

  async getAppointmentById(
    id: string
  ): Promise<ResponseSuccess | ResponseError> {
    return this.getDocbyId(AppointmentAdapter.COLLECTION, id)
      .then((result) => result as ResponseSuccess)
      .catch((error) => {
        throw error
      })
  }

  async getAllAppointments(): Promise<ResponseSuccess | ResponseError> {
    const data = this.getAllbyCollection(AppointmentAdapter.COLLECTION)
    return data
      .then((result) => result as ResponseSuccess)
      .catch((error) => {
        throw error
      })
  }
}
