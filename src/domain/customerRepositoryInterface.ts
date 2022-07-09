import Customer from './customer'

export default interface CustomerRepositoryInterface {
  insert(customer: Customer): Promise<void>
  update(customer: Customer, id: string): Promise<void>
  getAllCustomers(): Promise<Customer[]>
  getCustomerById(id: string): Promise<Customer>
}
