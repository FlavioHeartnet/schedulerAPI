import FirebaseDb from '../../../infra/firestoreDb/firebaseDb'
import { CreateAppointmentDto } from '../../dto/create-appointment.dto'
import { UpdateAppointmentDTO } from '../../dto/update-appointment.dto'
import ResponseSuccess from '../../responseSuccess'

export default class AppointmentFirebaseAdapter extends FirebaseDb {
  public static COLLECTION: string = 'Appointment'
  constructor() {
    super()
  }

  async insert(data: CreateAppointmentDto): Promise<ResponseSuccess> {
    try {
      if (await this.validateAppointment(data)) {
        return {
          message: (
            await this.store(data, AppointmentFirebaseAdapter.COLLECTION)
          ).message,
          snapshop: [],
        } as ResponseSuccess
      }
      throw new Error('Appointment already exists')
    } catch (e) {
      throw e
    }
  }

  protected async validateAppointment(
    data: CreateAppointmentDto
  ): Promise<boolean> {
    return await this.getAppointmentByDate(data.date)
  }

  async getAppointmentByDate(date: Date): Promise<boolean> {
    try {
      const data = await this.getDocsbyWhere(
        AppointmentFirebaseAdapter.COLLECTION,
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

  async update(data: UpdateAppointmentDTO): Promise<ResponseSuccess> {
    try {
      await this.edit(data, AppointmentFirebaseAdapter.COLLECTION, data.id)
      return { message: data.id, snapshop: [data] } as ResponseSuccess
    } catch (e) {
      throw this.exceptionHandler(e)
    }
  }

  async getAppointmentById(id: string): Promise<ResponseSuccess> {
    return this.getDocbyId(AppointmentFirebaseAdapter.COLLECTION, id)
      .then((result) => result as ResponseSuccess)
      .catch((error) => {
        throw error
      })
  }

  async getAllAppointments(): Promise<ResponseSuccess> {
    const data = this.getAllbyCollection(AppointmentFirebaseAdapter.COLLECTION)
    return data
      .then((result) => result as ResponseSuccess)
      .catch((error) => {
        throw error
      })
  }
}
