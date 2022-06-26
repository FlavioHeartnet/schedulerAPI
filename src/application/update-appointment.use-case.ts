import AppointmentFirebaseAdapter from '../appointments/adapters/firebaseAdapter/appointmentFirebaseAdapter'

export class CreateAppointmentUseCase {
    constructor(private appointmentAdapter: AppointmentFirebaseAdapter) { }

    async execute(
        input: CreateAppointmentInput
    ): Promise<CreateAppointmentOutput> {
        await await this.appointmentAdapter.update(input)
        return {
            date: input.date,
            notes: input.notes,
            isDone: input.isDone,
        }
    }
}

type CreateAppointmentInput = {
    id: string
    date: Date
    notes: string
    isDone: boolean
}

type CreateAppointmentOutput = {
    date: Date
    notes: string
    isDone: boolean
}
