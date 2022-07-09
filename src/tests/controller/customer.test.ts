import CustomerController from '../../customers/customerController'
import Customer from '../../domain/customer'
import ResponseSuccess from '../../domain/responseSuccess'

const controller = new CustomerController()
const mockedCustomer: Customer = new Customer().create(
  'Jonh Doe',
  '123456789',
  '01/01/2000'
)
const mockedSucessResponse: ResponseSuccess = {
  message: '1',
  snapshop: [mockedCustomer],
}
const mockedErrorResponseBR: Error = {
  message:
    'A operação foi abortada, normalmente devido a um problema de simultaneidade.',
  name: 'aborted',
}
const mockedAlreadyExists: Error = {
  message: 'Customer already exists',
  name: 'already_exists',
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
      expect(error).toEqual(mockedErrorResponseBR)
    })
  })

  it('should try to create a new appointment and return appointment already exists', () => {
    jest
      .spyOn(controller, 'isRegistrationValid')
      .mockImplementation(() => Promise.resolve(false))
    controller.newCustomer(mockedCustomer).catch((error) => {
      expect(error).toEqual(mockedAlreadyExists)
    })
  })
})

describe('Handle the edition of an appointment', () => {
  it('should edit an appointment and return success', () => {
    jest
      .spyOn(controller, 'edit')
      .mockImplementation(() => Promise.resolve(mockedSucessResponse))
    controller.updateCustomer('1', mockedCustomer).then((result) => {
      expect(result as ResponseSuccess).toEqual(mockedSucessResponse)
    })
  })

  it('should edit an appointment and return FirebaseError', () => {
    jest
      .spyOn(controller, 'edit')
      .mockImplementation(() => Promise.reject(mockedErrorResponseBR))
    controller.updateCustomer('1', mockedCustomer).catch((error) => {
      expect(error).toEqual(mockedErrorResponseBR)
    })
  })
})
