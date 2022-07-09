import AppointmentsRepositoryInterface from '../domain/appointmentsRepositoryInterface'

export default class GetByIdAppointmentUseCase {
    constructor(private appointmentRepo: AppointmentsRepositoryInterface) { }

    async execute(input: string): Promise<GetByIdAppointmentOutput> {
        return await this.appointmentRepo.getAppointmentById(input)
    }
}

type GetByIdAppointmentOutput = {
    id?: string
    date: Date
    notes: string
    isDone: boolean
}
