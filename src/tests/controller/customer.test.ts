import CustomerController from '../../controller/customerController'
import Customer from '../../domain/customer'
import ResponseError from '../../domain/responseError'
import ResponseSuccess from '../../domain/responseSuccess'

const controller = new CustomerController()
const mockedCustomer: Customer = {
  name: 'Teste',
  registrationId: '123456789',
  birthdate: new Date(),
}
const mockedSucessResponse: ResponseSuccess = {
  message: '1',
  snapshop: [mockedCustomer],
}
const mockedErrorResponseBR: ResponseError = {
  message:
    'A operação foi abortada, normalmente devido a um problema de simultaneidade.',
  code: 'aborted',
}
const mockedAlreadyExists: ResponseError = {
  message: 'Customer already exists',
  code: 'already_exists',
}

describe('Handle the creation of a new appointment', () => {
  it('should create a new appointment and return success', () => {
    jest
      .spyOn(controller, 'insert')
      .mockImplementation(() => Promise.resolve(mockedSucessResponse))
    controller.newCustomer(mockedCustomer).then((result) => {
      expect(result as ResponseSuccess).toEqual(mockedSucessResponse)
    })
  })

  it('should create a new appointment and return FirebaseError', () => {
    jest
      .spyOn(controller, 'insert')
      .mockImplementation(() => Promise.reject(mockedErrorResponseBR))
    controller.newCustomer(mockedCustomer).catch((error) => {
      expect(error as ResponseError).toEqual(mockedErrorResponseBR)
    })
  })

  it('should try to create a new appointment and return appointment already exists', () => {
    jest
      .spyOn(controller, 'isRegistrationValid')
      .mockImplementation(() => Promise.resolve(false))
    controller.newCustomer(mockedCustomer).catch((error) => {
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
      .updateCustomer(
        '1',
        mockedCustomer.name,
        mockedCustomer.registrationId,
        mockedCustomer.birthdate
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
      .updateCustomer(
        '1',
        mockedCustomer.name,
        mockedCustomer.registrationId,
        mockedCustomer.birthdate
      )
      .catch((error) => {
        expect(error as ResponseError).toEqual(mockedErrorResponseBR)
      })
  })
})
