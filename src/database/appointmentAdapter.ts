import Appointment from "../model/appointments";
import ResponseError from "../model/responseError";
import ResponseSuccess from "../model/responseSuccess";
import firebaseAdapter from "./firebaseAdapter";

export default class AppointmentAdapter extends firebaseAdapter {
    public static COLLECTION: string = 'Appointment'
    constructor() {
        super();
    }

    async insert(data: Appointment): Promise<ResponseSuccess | ResponseError> {
        try {
            return {
                message: (await this.store(data, AppointmentAdapter.COLLECTION)).message,
                snapshop: [],
            } as ResponseSuccess
        } catch (e) {
            return e as ResponseError;
        }
    }

    async update(data: Appointment, id: string): Promise<ResponseSuccess | ResponseError> {
        try {
            await this.edit(data, AppointmentAdapter.COLLECTION, id)
            return { message: id, snapshop: [] } as ResponseSuccess
        } catch (e) {
            return e as ResponseError
        }
    }

    async getAppointmentById(id: string): Promise<ResponseSuccess | ResponseError> {
        return this.getDocbyId(AppointmentAdapter.COLLECTION, id)
            .then((result) => result as ResponseSuccess)
            .catch((error) => error as ResponseError)
    }

    async getAllAppointments(): Promise<ResponseSuccess | ResponseError> {
        const data = this.getAllbyCollection(AppointmentAdapter.COLLECTION)
        return data
            .then((result) => result as ResponseSuccess)
            .catch((error) => error as ResponseError)
    }

}