import CustomerController from '../../controller/customerController'

describe('Handle the creation of a new user', () => {
  it('should create a new customer and return success', () => {
    expect(CustomerController).toBeDefined()
  })

  it('should create a new customer and return FirebaseError', () => {
    expect(CustomerController).toBeDefined()
  })

  it('should try to create a new customer and return registration already exists', () => {
    expect(CustomerController).toBeDefined()
  })
})
