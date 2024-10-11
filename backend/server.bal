import ballerina/http;
import ballerina/sql;

@http:ServiceConfig {
    cors: {         
        allowOrigins: ["http://localhost:3306"],
        allowMethods: ["GET", "POST", "OPTIONS"]
    }
    // auth: [
    //     {
    //         jwtValidatorConfig: {
    //             issuer: "wso2",
    //             audience: "ballerina",
    //             signatureConfig: {
    //                 certFile: "resources/public.crt"
    //             }
    //         },
    //         scopes: ["admin"]
    //     }
    // ]
}
service /appointments on new http:Listener(9090) {

    // Get all appointments
    isolated resource function get appointments() returns Appointment[]|error {
        return getAllAppointments();
    };

    // Get appointment by ID
    //    isolated resource function get cargos/[string cargoId]/orders() returns Order[]|error {
    isolated resource function get appointments/[int appointmentId]/appointments() returns Appointment|http:NotFound|http:InternalServerError {
        Appointment|sql:Error appointmentEntry = fetchAppointmentById(appointmentId);
        if appointmentEntry is Appointment {
            return appointmentEntry;
        }
        if (appointmentEntry is sql:NoRowsError) {
            return <http:NotFound>{body: {message: "Appointment not found"}};
        }
        return <http:InternalServerError>{body: {message: "Error occurred while retrieving the appointment"}};
    };

    // Get all doctors
    isolated resource function get doctors() returns Doctor[]|error {
        return selectAllDoctors();
    };

    // Get doctor by ID
    isolated resource function get doctors/[int doctorId]() returns Doctor|http:NotFound|http:InternalServerError {
        Doctor|sql:Error doctorEntry = fetchDoctorById(doctorId);
        if doctorEntry is Doctor {
            return doctorEntry;
        }
        if (doctorEntry is sql:NoRowsError) {
            return <http:NotFound>{body: {message: "Doctor not found"}};
        }
        return <http:InternalServerError>{body: {message: "Error occurred while retrieving the doctor"}};
    };

    // Add new appointment
    isolated resource function post appointments(Appointment appointmentEntry) returns http:Ok|http:InternalServerError {
        sql:ExecutionResult|error result = addAppointment(appointmentEntry);
        if result is sql:ExecutionResult {
            return http:OK;
        }
        return http:INTERNAL_SERVER_ERROR;
    };

    // Add new doctor
    isolated resource function post doctors(Doctor doctorEntry) returns http:Ok|http:InternalServerError {
        sql:ExecutionResult|error result = addDoctor(doctorEntry);
        if result is sql:ExecutionResult {
            return http:OK;
        }
        return http:INTERNAL_SERVER_ERROR;
    };
}

// Database functions

isolated function getAllAppointments() returns Appointment[]|sql:Error {
    // Implement logic to fetch all appointments from the database
    // Example SQL query: "SELECT * FROM appointments"
    return [];
}

isolated function fetchAppointmentById(int appointmentId) returns Appointment|sql:Error {
    // Implement logic to fetch appointment by ID from the database
    // Example SQL query: "SELECT * FROM appointments WHERE appointment_id = ?"
    return error("Function not implemented");
}

isolated function fetchAllDoctors() returns Doctor[]|sql:Error {
    // Implement logic to fetch all doctors from the database
    // Example SQL query: "SELECT * FROM doctors"
    return [];
}

isolated function fetchDoctorById(int doctorId) returns Doctor|sql:Error {
    // Implement logic to fetch doctor by ID from the database
    // Example SQL query: "SELECT * FROM doctors WHERE doctor_id = ?"
    return error("Function not implemented");
}

isolated function addAppointment(Appointment appointmentEntry) returns sql:ExecutionResult|sql:Error {
    // Implement logic to insert new appointment into the database
    // Example SQL query: "INSERT INTO appointments (appointment_date, appointment_time) VALUES (?, ?)"
    return error("Function not implemented"); // Placeholder return statement
}

isolated function addDoctor(Doctor doctorEntry) returns sql:ExecutionResult|sql:Error {
    // Implement logic to insert new doctor into the database
    // Example SQL query: "INSERT INTO doctors (doctor_name, specialized_area, availability, appointment_id) VALUES (?, ?, ?, ?)"
    return error("Function not implemented"); // Placeholder return statement
}
