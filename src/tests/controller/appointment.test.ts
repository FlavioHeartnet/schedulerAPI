import AppointmentController from '../../appointments/appointmentController'
import Appointment from '../../domain/appointments'
import ResponseSuccess from '../../domain/responseSuccess'

const controller: AppointmentController = new AppointmentController()
const mockedAppointment: Appointment = {
  date: new Date('2022-06-10'),
  notes: 'test notes',
  isDone: false,
  serviceDoneAt: new Date(),
}

const mockedSucessResponse: ResponseSuccess = {
  message: '1',
  snapshop: [mockedAppointment],
}
const mockedErrorResponseBR: Error = {
  message:
    'A operação foi abortada, normalmente devido a um problema de simultaneidade.',
  name: 'aborted',
}

describe('Handle the creation of a new appointment', () => {
  it('should create a new appointment and return success', () => {
    jest
      .spyOn(controller, 'newAppointment')
      .mockImplementation(() => Promise.resolve(mockedSucessResponse))
    controller
      .newAppointment(
        mockedAppointment.date,
        mockedAppointment.notes,
        mockedAppointment.isDone
      )
      .then((result) => {
        expect(result as ResponseSuccess).toEqual(mockedSucessResponse)
      })
  })
})

it('should create a new appointment and return FirebaseError', () => {
  jest
    .spyOn(controller, 'newAppointment')
    .mockImplementation(() => Promise.reject(mockedErrorResponseBR))
  controller
    .newAppointment(
      mockedAppointment.date,
      mockedAppointment.notes,
      mockedAppointment.isDone
    )
    .catch((error) => {
      expect(error).toEqual(mockedErrorResponseBR)
    })
})

describe('Handle the edition of an appointment', () => {
  it('should edit an appointment and return success', () => {
    jest
      .spyOn(controller, 'updateAppointment')
      .mockImplementation(() => Promise.resolve(mockedSucessResponse))
    controller
      .updateAppointment(
        '1',
        mockedAppointment.date,
        mockedAppointment.notes,
        mockedAppointment.isDone
      )
      .then((result) => {
        expect(result as ResponseSuccess).toEqual(mockedSucessResponse)
      })
  })

  it('should edit an appointment and return FirebaseError', () => {
    jest
      .spyOn(controller, 'updateAppointment')
      .mockImplementation(() => Promise.reject(mockedErrorResponseBR))
    controller
      .updateAppointment(
        '1',
        mockedAppointment.date,
        mockedAppointment.notes,
        mockedAppointment.isDone
      )
      .catch((error) => {
        expect(error).toEqual(mockedErrorResponseBR)
      })
  })
})
