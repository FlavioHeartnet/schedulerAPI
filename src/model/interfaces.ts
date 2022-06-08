export interface ICustomer {
  name: String;
  registrationId: String;
  birthdate: Date;
}
export interface IResponseError {
  code: string
  error: string
}

export interface IResponseSuccess {
  message: String
}

export interface IAppointment {
  date: Date
  serviceDoneAt: Date
  notes: String
  isDone: boolean
}
