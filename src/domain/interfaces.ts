export interface ICustomer {
  name: string
  registrationId: string
  birthdate: Date
}

export interface IResponseSuccess {
  message: string
  snapshop: unknown[]
}

export interface IAppointment {
  date: Date
  serviceDoneAt: Date
  notes: string
  isDone: boolean
}
