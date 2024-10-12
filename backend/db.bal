import ballerinax/mysql;
import ballerina/sql;

configurable int port = ?;
configurable string host = ?;
configurable string user = ?;
configurable string database = ?;
configurable string password = ?;
configurable mysql:Options & readonly connectionOptions = {};

final mysql:Client dbClient = check new(
    host = host,
    port =  port,
    database =  database,
    user =  user,
    password =  password,
    options = connectionOptions
);

// Define the Appointment record
// type Appointment record {
//     string date;
//     string time;
// };

// Define the Doctor record
type Doctor record {
    string name;
    string specializedArea;
    string availability;
    int appointmentId;
};

// Insert a new appointment
// isolated function insertAppointment(Appointment entry) returns sql:ExecutionResult|error {
//     sql:ParameterizedQuery insertQuery = `INSERT INTO appointments (appointment_date, appointment_time) VALUES (
//                                                 ${entry.date}, ${entry.time})`;
//     return dbClient->execute(insertQuery);
// }

// Insert a new doctor
isolated function insertDoctor(Doctor entry) returns sql:ExecutionResult|error {
    sql:ParameterizedQuery insertQuery = `INSERT INTO doctors (doctor_name, specialized_area, availability, appointment_id) VALUES (
                                            ${entry.name}, ${entry.specializedArea}, ${entry.availability}, ${entry.appointmentId})`;
    return dbClient->execute(insertQuery);
}

// Retrieve all appointments
isolated function selectAllAppointments() returns Appointment[]|error {
    sql:ParameterizedQuery selectQuery = `SELECT * FROM appointments`;
    stream<Appointment, error?> appointmentStream = dbClient->query(selectQuery);
    return from Appointment appointment in appointmentStream select appointment;
}

// Retrieve appointment by ID
isolated function selectAppointment(int appointmentId) returns Appointment|sql:Error {
    sql:ParameterizedQuery selectQuery = `SELECT * FROM appointments WHERE appointment_id = ${appointmentId}`;
    return dbClient->queryRow(selectQuery);
}

// Retrieve all doctors
isolated function selectAllDoctors() returns Doctor[]|error {
    sql:ParameterizedQuery selectQuery = `SELECT * FROM doctors`;
    stream<Doctor, error?> doctorStream = dbClient->query(selectQuery);
    return from Doctor doctor in doctorStream select doctor;
}

// Retrieve doctor by ID
isolated function selectDoctor(int doctorId) returns Doctor|sql:Error {
    sql:ParameterizedQuery selectQuery = `SELECT * FROM doctors WHERE doctor_id = ${doctorId}`;
    return dbClient->queryRow(selectQuery);
}

// Retrieve location of a doctor (example of additional functionality)
// isolated function getDoctorLocation(int doctorId) returns Location|sql:Error {
//     sql:ParameterizedQuery selectQuery = `SELECT latitude, longitude FROM locations WHERE doctor_id = ${doctorId}`;
//     return dbClient->queryRow(selectQuery);
// }
