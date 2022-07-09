import AppointmentsRepositoryInterface from '../domain/appointmentsRepositoryInterface'

export default class GetAllAppointmentUseCase {
    constructor(private appointmentRepo: AppointmentsRepositoryInterface) { }

    async execute(): Promise<GetAllAppointmentOutput[]> {
        return await this.appointmentRepo.getAllAppointments()
    }
}

type GetAllAppointmentOutput = {
    id?: string
    date: Date
    notes: string
    isDone: boolean
}
