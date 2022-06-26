import AppointmentFirebaseAdapter from '../controller/Adapters/firebaseAdapters/appointmentFirebaseAdapter'

export class CreateAppointmentUseCase {
  constructor(private appointmentAdapter: AppointmentFirebaseAdapter) {}

  async execute(
    input: CreateAppointmentInput
  ): Promise<CreateAppointmentOutput> {
    return {
      id: await (await this.appointmentAdapter.insert(input)).message,
      date: input.date,
      notes: input.notes,
      isDone: input.isDone,
    }
  }
}

type CreateAppointmentInput = {
  date: Date
  notes: string
  isDone: boolean
}

type CreateAppointmentOutput = {
  id: string
  date: Date
  notes: string
  isDone: boolean
}
