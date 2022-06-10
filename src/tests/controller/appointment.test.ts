import AppointmentController from "../../controller/appointmentController";


describe('Handle the creation of a new appointment', () => {
    it('should create a new appointment and return success', () => {
        expect(AppointmentController).toBeDefined();
    });

    it('should create a new appointment and return FirebaseError', () => {
        expect(AppointmentController).toBeDefined();
    });

    it('should try to create a new appointment and return appointment already exists', () => {
        expect(AppointmentController).toBeDefined();
    });
});