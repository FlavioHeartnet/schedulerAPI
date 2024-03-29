import FirebaseDb from '../../../infra/firestoreDb/firebaseDb'
import AppointmentsRepositoryInterface from '../../../domain/appointmentsRepositoryInterface'
import Appointment from '../../../domain/appointments'

export default class AppointmentFirebaseAdapter
  extends FirebaseDb
  implements AppointmentsRepositoryInterface
{
  public static COLLECTION: string = 'Appointment'
  constructor() {
    super()
  }
  async update(appointment: Appointment, id: string): Promise<void> {
    try {
      await this.edit(appointment, AppointmentFirebaseAdapter.COLLECTION, id)
    } catch (e) {
      throw this.exceptionHandler(e)
    }
  }

  async insert(data: Appointment): Promise<void> {
    try {
      if (await this.validateAppointment(data)) {
        await this.store(data, AppointmentFirebaseAdapter.COLLECTION)
      } else {
        throw new Error('Appointment already exists!')
      }
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

  async getAppointmentById(id: string): Promise<Appointment> {
    return this.getDocbyId(AppointmentFirebaseAdapter.COLLECTION, id)
      .then((result) => {
        return new Appointment().create(
          result.snapshop[0].date,
          result.snapshop[0].notes,
          result.snapshop[0].isDone
        )
      })
      .catch((error) => {
        throw error
      })
  }

  async getAllAppointments(): Promise<Appointment[]> {
    const data = this.getAllbyCollection(AppointmentFirebaseAdapter.COLLECTION)
    return data
      .then((result) =>
        result.snapshop.map((item) =>
          new Appointment().create(item.date, item.notes, item.isDone)
        )
      )
      .catch((error) => {
        throw error
      })
  }
}
