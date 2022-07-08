import CustomerRepositoryInterface from "./customerRepositoryInterface"

export default abstract class Customer implements CustomerRepositoryInterface {
  abstract insert(customer: Customer): Promise<void>
  abstract update(customer: Customer, id: string): Promise<void>
  abstract getAllCustomers(): Promise<Customer[]>
  abstract getCustomerById(id: string): Promise<Customer>

  private _name: string
  private _registrationId: string
  private _birthdate: Date

  public get registrationId(): string {
    return this._registrationId
  }
  public set registrationId(value: string) {
    this._registrationId = value
  }
  public get birthdate(): Date {
    return this._birthdate
  }
  public set birthdate(value: Date) {
    this._birthdate = value
  }
  public get name(): string {
    return this._name
  }
  public set name(value: string) {
    this._name = value
  }
  private _id?: string | undefined = ''
  public get id(): string | undefined {
    return this._id
  }
  public set id(value: string | undefined) {
    this._id = value
  }
}
