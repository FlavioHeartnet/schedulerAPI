export interface ICustomer {
  name: String
  registrationId: String
  birthdate: Date
}
export interface IResponseError {
  code: string
  message: string
}

export interface IResponseSuccess {
  message: String
  snapshop: unknown[]
}

export interface IAppointment {
  date: Date
  serviceDoneAt: Date
  notes: String
  isDone: boolean
}
