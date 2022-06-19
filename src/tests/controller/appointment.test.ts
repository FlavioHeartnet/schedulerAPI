import AppointmentController from '../../controller/appointmentController'
import Appointment from '../../domain/appointments'
import ResponseError from '../../domain/responseError'
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
const mockedErrorResponseBR: ResponseError = {
  message:
    'A operação foi abortada, normalmente devido a um problema de simultaneidade.',
  code: 'aborted',
}
const mockedAlreadyExists: ResponseError = {
  message: 'Appointment already exists',
  code: 'already_exists',
}
describe('Handle the creation of a new appointment', () => {
  it('should create a new appointment and return success', () => {
    jest
      .spyOn(controller, 'insert')
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

  it('should create a new appointment and return FirebaseError', () => {
    jest
      .spyOn(controller, 'insert')
      .mockImplementation(() => Promise.reject(mockedErrorResponseBR))
    controller
      .newAppointment(
        mockedAppointment.date,
        mockedAppointment.notes,
        mockedAppointment.isDone
      )
      .catch((error) => {
        expect(error as ResponseError).toEqual(mockedErrorResponseBR)
      })
  })

  it('should try to create a new appointment and return appointment already exists', () => {
    jest
      .spyOn(controller, 'getAppointmentByDate')
      .mockImplementation(() => Promise.resolve(false))
    controller
      .newAppointment(
        mockedAppointment.date,
        mockedAppointment.notes,
        mockedAppointment.isDone
      )
      .catch((error) => {
        expect(error as ResponseError).toEqual(mockedAlreadyExists)
      })
  })
})

describe('Handle the edition of an appointment', () => {
  it('should edit an appointment and return success', () => {
    jest
      .spyOn(controller, 'edit')
      .mockImplementation(() => Promise.resolve(mockedSucessResponse))
    controller
      .updateAppointment(
        '1',
        mockedAppointment.date,
        mockedAppointment.serviceDoneAt,
        mockedAppointment.notes,
        mockedAppointment.isDone
      )
      .then((result) => {
        expect(result as ResponseSuccess).toEqual(mockedSucessResponse)
      })
  })

  it('should edit an appointment and return FirebaseError', () => {
    jest
      .spyOn(controller, 'edit')
      .mockImplementation(() => Promise.reject(mockedErrorResponseBR))
    controller
      .updateAppointment(
        '1',
        mockedAppointment.date,
        mockedAppointment.serviceDoneAt,
        mockedAppointment.notes,
        mockedAppointment.isDone
      )
      .catch((error) => {
        expect(error as ResponseError).toEqual(mockedErrorResponseBR)
      })
  })
})
